import { prismafindMany } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('user', body)
    } catch (error) {
        console.error(error);
        
        return {
            statusCode: 404,
            statusMessage: 'Не удалось получить данные'
        }
    }
    return 'sdf'
})