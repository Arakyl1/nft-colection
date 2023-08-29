import { Prisma, User } from "@prisma/client";

export type NAMEAPP = 'NFT_MARKET'
export type CUSTOM_EVENT_NAME = 'show-modal-basket' | 'show-modal-favorite' | 'create-user' | 'showMenu'


// export const userCardBaseParamsSelect = selectUserForCard({})
// const _userCardBaseParamsSelect = Prisma.validator<Prisma.UserArgs>()(userCardBaseParamsSelect)
// export type _UserCardBase = Prisma.UserGetPayload<typeof _userCardBaseParamsSelect>

// export const bestUserCardBaseParamsSelect = selectUserForCard({ ranting: true, card: true })
// const _bestUserCardBaseParamsSelect = Prisma.validator<Prisma.UserArgs>()(bestUserCardBaseParamsSelect)
// export type _BestUserCard = Prisma.UserGetPayload<typeof _bestUserCardBaseParamsSelect>


// export const NFTCardBaseParamsSelect = selectNFTCard({ author: { ...userCardBaseParamsSelect} })
// const _NFTCardBaseParamsSelect = Prisma.validator<Prisma.NFTCardArgs>()(NFTCardBaseParamsSelect)
// export type _NFTCardAddedUser = Prisma.NFTCardGetPayload<typeof _NFTCardBaseParamsSelect>

// export const blogCardBaseParamsSelect = selectBlogCard({})
// const _blogCardBaseParamsSelect = Prisma.validator<Prisma.BlogCardArgs>()(blogCardBaseParamsSelect)
// export type _BlogCardBase = Prisma.BlogCardGetPayload<typeof _blogCardBaseParamsSelect>

// export const colectionAddedAuthorBaseParamsSelect = selectColection({})
// const _colectionAddedAuthorBaseParamsSelect = Prisma.validator<Prisma.ColectionArgs>()(colectionAddedAuthorBaseParamsSelect)
// export type _ColectionAddedAuthor = Prisma.ColectionGetPayload<typeof _colectionAddedAuthorBaseParamsSelect>

// export type BasketItem = { id: number, price: number, quantity: number }

// old interface
// export interface User {
//     id?: number,
//     profileImage: string,
//     name?: string,
//     username: string,
//     ranting?: number
// }

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
// export interface CommentUser {
//     id: number,
//     ranting: number,
//     text: string,
//     card: { img: string, id: number }
//     author: User
// }

// new type
export interface Content {
    AUTH_TEXT_TITLE_REGISTER: string,
    AUTH_TEXT_BUTTOM_REGISTER: string,
    AUTH_TEXT_SPAN_REGISTER: string,
    AUTH_TEXT_PLACEHOLDER_USERNAME: string,
    AUTH_TEXT_PLACEHOLDER_EMAIL: string,
    AUTH_TEXT_PLACEHOLDER_PASSWORD: string,
    AUTH_TEXT_PLACEHOLDER_PASSWORD_D: string,
    AUTH_TEXT_TITLE_LOGIN: string,
    AUTH_TEXT_BUTTOM_LOGIN: string,
    AUTH_TEXT_SPAN_LOGIN: string,
    AUTH_UNAUTHORIZED: string,
    DEFAUT_USER_PHOTO_LINK: string,
    AUTH_REGISTER_SUCH_USER_ALREADY_EXISTS: string,
    AUTH_LOGINT_USER_IS_NOT_REGISTERED: string,
    AUTH_LOGINT_INVALID_PASSWORD: string,
    AUTH_ERROR: string,
    REFRECH_TOKEN_ABSENT_IN_COOKEI: string,
    REFRECH_TOKEN_ABSENT_IN_DB: string,
    REFRECH_TOKEN_INVALID: string,
    REFRECH_TOKEN_ERROR: string,
    CHATROOM_TEXT_TIME_YESTADAY: string,
    ALERT_BASKET_ADD_ITEM: string,
    ALERT_BASKET_PRODUCT_IS_ALREADY_THERE: string,
    ALERT_AUTH_LOGIN_INVALID_DATA: string,
    ALERT_AUTH_REGISTER_SUCCESS: string,
    ALERT_AUTH_REGISTER_PASSWORD_DONT_MATCH: string,
    ALERT_COMMENT_CREATE_INVALID_DATA: string,
    ALERT_COMMENT_CREATE_SUCCESS: string,
    ALERT_PRODUCT_CREATE_INVALID_DATA: string,
    ALERT_PRODUCT_CREATE_DOOWLOAD_PHOTO: string,
    ALERT_PRODUCT_CREATE_SELECT_MAIN_PHOTO: string,
    ALERT_PRODUCT_CREATE_SUCCESS: string,
    ALERT_PRODUCT_CREATE_ERROR: string,
    ALERT_COPE_LINK_INFO_TEXT: string,
    ALERT_TEXT_BLOG_CREATE: string,
    ALERT_TEXT_INFO_AUTORIGATON_REQUIRED: string,
    ALERT_BLOG_TEXT_CREATE_SUCCESS: string,
    ALERT_BLOG_TEXT_CREATE_ERROR: string,
    TEXT_AUTH_REGISTER_PASSWORD_INFO: string,
    TEXT_BASKET_EMPRY: string,
    TEXT_BASKET_ADD_ITEM: string,
    TEXT_FILTER_BUTTON_RESET: string;
    SERVER_BLOG_CREATE_ERROR: string;
    SERVER_BLOG_CREATE_ERROR_UNKNOW_PROPERTY: string,
    SERVER_BLOG_CREATE_ERROR_USER_ID: string,
    SERVER_BLOG_CREATE_ERROR_IMAGE_DATA: string,
    SERVER_COMMENT_CREATE_ERROR: string,
    SERVER_COMMENT_CREATE_ERROR_INVALID_NUMBER_VALUE: string,
    SERVER_COMMENT_CREATE_ERROR_INVALID_RELATION_ID: string,
    SERVER_COMMENT_CREATE_ERROR_UNKNOW_PROPERTY: string,
    SERVER_COLECTION_CREATE_ERROR: string,
    SERVER_COLECTION_CREATE_ERROR_INVALID_NUMBER_VALUE: string,
    SERVER_COLECTION_CREATE_ERROR_INVALID_RELATION_ID: string,
    SERVER_COLECTION_CREATE_ERROR_UNKNOW_PROPERTY:string,
    SERVER_NFT_CARD_CREATE_ERROR: string,
    SERVER_NFT_CARD_CREATE_ERROR_INVALID_NUMBER_VALUE: string,
    SERVER_NFT_CARD_CREATE_ERROR_INVALID_RELATION_ID: string,
    SERVER_NFT_CARD_CREATE_ERROR_UNKNOW_PROPERTY: string,
    SERVER_NFT_CARD_CREATE_ERROR_INVALID_CURRENCY: string,
    SERVER_ATTRIBUTES_CREATE_ERROR: string, 
    SERVER_ATTRIBUTES_CREATE_ERROR_INVALID_NUMBER_VALUE: string,
    SERVER_ATTRIBUTES_CREATE_ERROR_INVALID_RELATION_ID: string,
    SERVER_ATTRIBUTES_CREATE_ERROR_UNKNOW_PROPERTY:string,
    CLIENT_FORM_DOOWLOAD_IMAGE_TEXT: string,
    CLIENT_FORM_DOOWLOAD_IMAGE_SELECT_MAIN_PHOTO: string,
    CLIENT_BLOG_CREATE_ERROR_INVALID_DATA: string,
    CLIENT_BLOG_CREATE_ERROR_USER_IS_NOT_LOGGED_IN: string,
    CLIENT_NFT_CARD_CREATE_TEXT_PRICE_PLACEHOLDER: string,
    CLIENT_NFT_CARD_CREATE_TEXT_QUANTITY_PLACEHOLDER: string,
    CLIENT_NFT_CARD_CREATE_TEXT_ADD_ATTRIBUTE: string,
    CLIENT_NFT_CARD_CREATE_ERROR_ALERT: string,
    CLIENT_NFT_CARD_CREATE_ERROR_INVALID_DATA: string,
    CLIENT_NFT_CARD_CREATE_ERROR_USER_IS_NOT_LOGGED_IN: string,
    CLIENT_NFT_CARD_CREATE_SUCCESS_TEXT_ALERT: string,
    
}
export type CONTENT_KEY = keyof Content


export type Enumerable<T> = T | Array<T>;
export type checkArray<T> = T extends any[] ? T[number] : T
export type CookieKey = 'refrech_token'
export type RecordOption<T extends PropertyKey, U> = { [K in T]: U }
export type Cached<T extends (...args: any) => any> = ReturnType<T> extends Promise<infer Y> ? Y : ReturnType<T>
export type KeysMatchingWrite<T extends object, V> = {
    [K in keyof T]-?: [V] extends [T[K]] ? K : never
}[keyof T]

export type KeysMatchingWriteOuther<T extends object, V> = {
    [K in keyof T]-?: [V] extends [T[K]] ? never : K
}[keyof T]


export type MethodError = { messadge: string, type: string, [x: string]: any }
export type ProductCardBase = Prisma.NFTCardGetPayload<{ include: { attributes: true } }>
export type UserLoginData = Pick<Prisma.UserCreateInput, 'username' | 'password'>
export type UserRegisterData = Pick<Prisma.UserCreateInput, 'username' | 'password' | 'email'> & { repeartPassword: string }
export type ResponseDownloadImage = { url: string; secretUrl: string; }



export interface ResponseAuthUser {
    user?: Omit<User,'password'>,
    access_token?: string,
    message?: string,
    messageKey?: string
}
export type WhereIntFilterKey = (keyof Prisma.IntFilter)
export const WhereIntFilterKey: WhereIntFilterKey[] = ['equals', 'not', 'in', 'notIn', 'lt', 'lte', 'gt', 'gte',]
export type WhereSrtingFilterKey = (keyof Prisma.StringFilter)
export const WhereSrtingFilterKey: WhereSrtingFilterKey[] =  ['contains','endsWith','equals','gt','gte','in','lt','lte','mode','not', 'notIn','startsWith']
export type WhereDateFilterKey = keyof Prisma.DateTimeFilter
export const WhereDateFilterKey: WhereDateFilterKey[] = ['equals', 'gt', 'gte','in','lt','lte','notIn']
export type keyStringMode = Prisma.QueryMode
export const keyStringMode: keyStringMode[] = ['default','insensitive']
export type SortOrder = Prisma.SortOrder
export const sortOrder: SortOrder[] = ['asc','desc']
export type keyOtherOption = 's'|'t'
export const keyOtherOption: keyOtherOption[] = ['s','t']

export type getModelName<T extends Prisma.ModelName> = T


export interface TypeMapCreate {
    'NFTCard': Prisma.NFTCardCreateArgs,
    'Attributes': Prisma.AttributesCreateArgs,
    'BlogCard': Prisma.BlogCardCreateArgs,
    'Image': Prisma.ImageCreateArgs,
    'Colection': Prisma.ColectionCreateArgs,
    'User': Prisma.UserCreateArgs,
    'Comment': Prisma.CommentCreateArgs,
    'RefrechToken': Prisma.RefrechTokenCreateArgs,
}

export interface TypeMapCreateMany {
    'NFTCard': Prisma.NFTCardCreateManyArgs,
    'Attributes': Prisma.AttributesCreateManyArgs,
    'BlogCard': Prisma.BlogCardCreateManyArgs,
    'Image': Prisma.ImageCreateManyArgs,
    'Colection': Prisma.ColectionCreateManyArgs,
    'User': Prisma.UserCreateManyArgs,
    'Comment': Prisma.CommentCreateManyArgs,
    'RefrechToken': Prisma.RefrechTokenCreateManyArgs,
}

export interface TypeMapFindMany {
    'Attributes': Prisma.AttributesFindManyArgs,
    'BlogCard': Prisma.BlogCardFindManyArgs,
    'Image': Prisma.ImageFindManyArgs,
    'Colection': Prisma.ColectionFindManyArgs,
    'User': Prisma.UserFindManyArgs,
    'Comment': Prisma.CommentFindManyArgs,
    'NFTCard': Prisma.NFTCardFindManyArgs,
    'RefrechToken': Prisma.RefrechTokenFindManyArgs,
}

export interface TypeMapFindUnique {
    'NFTCard': Prisma.NFTCardFindUniqueArgs,
    'Attributes': Prisma.AttributesFindUniqueArgs,
    'BlogCard': Prisma.BlogCardFindUniqueArgs,
    'Image': Prisma.ImageFindUniqueArgs,
    'Colection': Prisma.ColectionFindUniqueArgs,
    'User': Prisma.UserFindUniqueArgs,
    'Comment': Prisma.CommentFindUniqueArgs,
    'RefrechToken': Prisma.RefrechTokenFindUniqueArgs,
}

export interface TypeMapUpdate {
    'NFTCard': Prisma.NFTCardUpdateArgs,
    'Attributes': Prisma.AttributesUpdateArgs,
    'BlogCard': Prisma.BlogCardUpdateArgs,
    'Image': Prisma.ImageUpdateArgs,
    'Colection': Prisma.ColectionUpdateArgs,
    'User': Prisma.UserUpdateArgs,
    'Comment': Prisma.CommentUpdateArgs,
    'RefrechToken': Prisma.RefrechTokenUpdateArgs,
}

export interface TypeMapUpdateMany {
    'NFTCard': Prisma.NFTCardUpdateManyArgs,
    'Attributes': Prisma.AttributesUpdateManyArgs,
    'BlogCard': Prisma.BlogCardUpdateManyArgs,
    'Image': Prisma.ImageUpdateManyArgs,
    'Colection': Prisma.ColectionUpdateManyArgs,
    'User': Prisma.UserUpdateManyArgs,
    'Comment': Prisma.CommentUpdateManyArgs,
    'RefrechToken': Prisma.RefrechTokenUpdateManyArgs,
}

export interface TypeMapDelete {
    'NFTCard': Prisma.NFTCardDeleteArgs,
    'Attributes': Prisma.AttributesDeleteArgs,
    'BlogCard': Prisma.BlogCardDeleteArgs,
    'Image': Prisma.ImageDeleteArgs,
    'Colection': Prisma.ColectionDeleteArgs,
    'User': Prisma.UserDeleteArgs,
    'Comment': Prisma.CommentDeleteArgs,
    'RefrechToken': Prisma.RefrechTokenDeleteArgs,
}

export interface TypeMapDeleteMany {
    'NFTCard': Prisma.NFTCardDeleteManyArgs,
    'Attributes': Prisma.AttributesDeleteManyArgs,
    'BlogCard': Prisma.BlogCardDeleteManyArgs,
    'Image': Prisma.ImageDeleteManyArgs,
    'Colection': Prisma.ColectionDeleteManyArgs,
    'User': Prisma.UserDeleteManyArgs,
    'Comment': Prisma.CommentDeleteManyArgs,
    'RefrechToken': Prisma.RefrechTokenDeleteManyArgs,
}


export interface UserBase extends Omit<User, 'password'> {}

export interface BasketItem  { quantity: number, data: ProductCardBase }

type GG<K extends Prisma.ModelName> = TypeMapCreate[K]['data']
export interface INIT_MODEL_PROPERTY<T extends Prisma.ModelName> {
    key: T,
    keyWork: Uncapitalize<T>,
    propElem: keyof GG<T>,
    propInt: KeysMatchingWrite<GG<T>, number>,
    propStr: KeysMatchingWrite<GG<T>, string>,
    propDateTime: KeysMatchingWrite<GG<T>, Date>,
    propRelation: Exclude<keyof GG<T>, KeysMatchingWrite<GG<T>, number> | KeysMatchingWrite<GG<T>, string> | KeysMatchingWrite<GG<T>, Date>>
}


