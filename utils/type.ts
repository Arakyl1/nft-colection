export interface User {
    id?: number,
    profileImage: string,
    name?: string,
    username: string,
    ranting?: number
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
export interface Colection{
    id: number,
    title: string,
    text: string,
}
export interface CommentUser {
    id: number,
    ranting: number,
    text: true,
    card: { img: string, id: true }
    author: User
}