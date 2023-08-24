import { Prisma } from "@prisma/client"

export const selectUser = (obj?: Prisma.UserSelect) => ({
    ...obj,
    id: true,
    name: true,
    username: true,
    profileImage: true,
    createAt: true,
    email: true,
})

export const selectNFTCard = (obj?:Prisma.NFTCardSelect) => ({
    ...obj,
    id: true,
    img: true,
    createAt: true,
    price: true,
    currency: true,
    quantity: true
})

export const selectColection = (obj?:Prisma.ColectionSelect) => ({
    ...obj,
    id: true,
    text: true,
    title: true,
    views: true,
})

export const selectAttridute = (obj?:Prisma.AttributesSelect) => ({
    ...obj,
    id: true,
    name: true
})

export const selectComment = (obj?:Prisma.CommentSelect) => ({
    ...obj,
    id: true,
    rating: true,
    text: true,
    createAt: true
})

export const selectImage = (obj?:Prisma.ImageSelect) => ({
    ...obj,
    id: true,
    link: true,
    main: true,
})

export const selectBlogCard = (obj?:Prisma.BlogCardSelect) => ({
    ...obj,
    id: true,
    title: true,
    text: true,
    createAt: true,
    image: { select: { ...selectImage() } },
})

export const selectRefrechToken = (obj?:Prisma.RefrechTokenSelect) => ({
    ...obj,
    id: true,
    token: true,
    createAt: true,
})

