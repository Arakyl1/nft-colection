import { prismafindMany } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('nFTCard', body)
    } catch (error) {
        console.log(error);
        
        return {
            statusCode: 404,
            statusMessage: 'Неудалось получить данные'
        }
    }
})