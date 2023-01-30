import { prismafindMany } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('colection', body)
    } catch (error:any) {
        sendError(event, error)
    }
})