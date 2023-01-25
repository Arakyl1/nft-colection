import { prismaDelete } from "~~/server/db/methods"
import { sendRefrechToken } from "~~/server/utils/jwt"

export default defineEventHandler(async(event) => {
    try {
        const cookiesRefrech = getCookie(event, 'refrech_token')
        if (cookiesRefrech) {
            prismaDelete('refrechToken', { where: { token: cookiesRefrech } })
        }
    } catch (error) {
        return error
    }
    sendRefrechToken(event, null)
    return { message: "Done"}
})