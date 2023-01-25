import { prismaFindUnique } from "~~/server/db/methods"
import { returnParamsMain } from "@/server/utils/searchParams";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const searchParams = returnParamsMain({ id: body })
        const data = await prismaFindUnique('user', searchParams)
        return data
    } catch (error) {
        return error
    }
})