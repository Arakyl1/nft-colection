import { prismaCreate } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismaCreate('comment', body)
    } catch (error) {
        console.error(error);
        
        return error
    }
})