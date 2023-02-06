import { prismafindMany } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('comment', body)
    } catch (error) {
        console.log(error);
        return error
    }
})