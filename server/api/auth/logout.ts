
import { CookieKey } from "~/type/index"
import prisma from "../../db"
import { sendRefrechToken } from "../../utils/jwt"

export default defineEventHandler(async(event) => {
    try {
        const keyCookie: CookieKey = 'refrech_token'
        const cookiesRefrech = getCookie(event, keyCookie)
        if (cookiesRefrech) {
            deleteCookie(event, keyCookie)
            await prisma.refrechToken.delete({ where: { token: cookiesRefrech } })
        }
    } catch (error) {
        return error
    }
    sendRefrechToken(event, null)
    return { message: "Done"}
})