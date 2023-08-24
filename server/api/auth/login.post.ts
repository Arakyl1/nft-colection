import { H3Event } from "h3"
import bcrypt from 'bcryptjs';
import prisma from "../../db";
import { Prisma } from "@prisma/client";
import { CookieKey } from "~/type/index";
import { userPersonalData, userTransform } from "~/server/utils/userTransform";
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";
import { GET_CONTENT_KEY } from "../../utils/other";

export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const keyCookie: CookieKey = 'refrech_token'
    const cookieRefrechToken = getCookie(event, keyCookie)

    const { username, password } = body
    const _userPersonalData: Prisma.UserSelect = { ...userPersonalData.select, password: true } 
    const searchParams: Prisma.UserFindUniqueArgs = { where: { username: username }, select: _userPersonalData }
    
    const user = await prisma.user.findUnique(searchParams)
    if (!user) return ({ messageKey: GET_CONTENT_KEY('AUTH_LOGINT_USER_IS_NOT_REGISTERED') })

    const doesThePaswordMatch = await bcrypt.compare(password, user.password)
    if (!doesThePaswordMatch) return ({ messageKey: GET_CONTENT_KEY('AUTH_LOGINT_INVALID_PASSWORD') })

    // Find and delete old Refrech Token in DB
    if (cookieRefrechToken) {
        const resFindToken = await prisma.refrechToken.findUnique({ where: { token: cookieRefrechToken }, select: { id: true } })
        if (resFindToken) {
            await prisma.refrechToken.delete({ where: { id: resFindToken.id } })
        }
    }

   
    // Generate new access and refrech token
    const { accessToken, refrechToken } = await generateTokens(user)
    await prisma.refrechToken.create({ data: { 'token': refrechToken, 'userId': user.id } })
    // Set refrech token in cookie
    sendRefrechToken(event, refrechToken)

    return {
        access_token: accessToken,
        user: userTransform(user)
    }
})