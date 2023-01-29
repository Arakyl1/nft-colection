export interface User {
    profileImage: string,
    name: string,
    username: string,
    ranting: number
}

export interface NFTCard {
    id: number,
    img: string,
    price: number,
    currency: string,
    quantity: number,
}

export interface BlogCard {
    id: number,
    title: string,
    img: string,
    text: string,
    date: string
}