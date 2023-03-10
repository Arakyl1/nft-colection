import { prismafindMany } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('attributes', body)
    } catch (error) {
        console.error(error);
        return error
    }
})