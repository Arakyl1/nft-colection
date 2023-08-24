import prisma from "~~/server/db";

export default defineEventHandler(async(event) => {
    const body = getQuery(event)
    try {
        return await prisma.user.findMany(body as never)
    } catch (error) {
        return { message: 'Не удалось получить данные'}
    }
})