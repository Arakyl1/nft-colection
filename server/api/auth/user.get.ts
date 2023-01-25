import { prismaFindUnique } from "@/server/db/methods"
import { decodeAccessToken } from "@/server/utils/jwt"
import { userTransform } from "~~/server/utils/userTransform"
import { returnParamsMain, returnParamsAditional } from "@/server/utils/searchParams";


export default defineEventHandler(async(event) => {
    const token = event.req.headers['authorization']?.split(' ')[1]
    const decoded = decodeAccessToken(token)
    
    if (!decoded) {
        return {statusCode: 401, statusMessage: 'Unauthorized' }
    }

    try {
        const searchParams = returnParamsMain({ id: decoded.userId }, returnParamsAditional())
        const user = await prismaFindUnique('user', searchParams)
        return { user: userTransform(user)}
    } catch (error) {
        return { statusCode: 404, statusMessage: '' }
    }
})