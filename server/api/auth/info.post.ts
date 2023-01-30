import { prismafindMany } from "~~/server/db/methods"

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('user', body)
    } catch (error: any) {
        sendError(event, error)
    }
})