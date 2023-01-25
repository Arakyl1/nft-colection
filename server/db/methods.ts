import prisma from "."

export const prismaCreate = async(key: string, body: object) => {
    return await prisma[key].create(body)
}

export const prismaFindUnique = async(key: string, body: object) => {
    return await prisma[key].findUnique(body)
}

export const prismafindMany = async(key: string, body: object) => {
    return prisma[key].findMany(body)
}

export const prismaUpdate = async(key: string, body: object) => {
    return prisma[key].update(body)
}

export const prismaDelete = async(key: string, body: object) => {
    return prisma[key].delete(body)
}