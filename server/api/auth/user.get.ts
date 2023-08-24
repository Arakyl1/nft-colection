import prisma from '~/server/db'
import { userPersonalData, userTransform } from "~/server/utils/userTransform";
import { decodeAccessToken } from '~~/server/utils/jwt';
import { isObject } from "../../utils/other";
import { GET_CONTENT_KEY } from "../../utils/other";

export default defineEventHandler(async(event) => {
    
    const token = getHeader(event, 'authorization')?.split(' ')[1] || ''
    const decoded = decodeAccessToken(token)
    if (decoded === null) return { messageKey: GET_CONTENT_KEY('AUTH_UNAUTHORIZED') }

    try {
        if (!isObject(decoded)) return { messageKey: GET_CONTENT_KEY('AUTH_ERROR') }
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: userPersonalData.select,
        })
        return user ? { user: userTransform(user) } : { message: GET_CONTENT_KEY('AUTH_ERROR') }
    } catch (error) {
        return { message: GET_CONTENT_KEY('AUTH_ERROR') }
    }
})