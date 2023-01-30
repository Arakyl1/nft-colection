import { prismaCreate } from "../../db/methods";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try { 
        return await prismaCreate('nFTCard', body)
    } catch (error) {
       return { message: 'Ошибка при создание' }
    }
})