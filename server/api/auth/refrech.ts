import { JwtPayload } from "jsonwebtoken"
import { decodeRefrechToken, generateTokens } from "../../utils/jwt"
import prisma from "../../db";
import { CookieKey } from "@/type/index";
import { isObject } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";

export default defineEventHandler(async(event) => {    
    const keyCookie: CookieKey = 'refrech_token'
    const refrechToken: string | null = getCookie(event, keyCookie) || null

    if (!refrechToken) return { messageKey: GET_CONTENT_KEY('REFRECH_TOKEN_ABSENT_IN_COOKEI') }
    const rToken = await prisma.refrechToken.findUnique({ where: { token: refrechToken }})
    if (!rToken)  return { message: GET_CONTENT_KEY('REFRECH_TOKEN_ABSENT_IN_DB') }
    const token: string | JwtPayload | null = decodeRefrechToken(refrechToken)
    
    try {
        
        if (token && isObject(token) && 'id' in token) {        
            const user = await prisma.user.findUnique({
                where: { id: token.id },
                select: { id: true }
            })
            
            if (!user) return
            const { accessToken } = await generateTokens(user)
            return { accessToken }
        } else {
            return { message: GET_CONTENT_KEY('REFRECH_TOKEN_INVALID') }
        }
    } catch (error) {
       return { message: GET_CONTENT_KEY('REFRECH_TOKEN_ERROR') }
    }
})