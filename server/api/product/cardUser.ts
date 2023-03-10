import { prismafindMany } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        return await prismafindMany('user', body)
    } catch (error) {
        return { message: 'Не удалось получить данные'}
    }
})