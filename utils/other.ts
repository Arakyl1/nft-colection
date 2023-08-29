import { Prisma } from "@prisma/client";
import { NAMEAPP, CONTENT_KEY, CUSTOM_EVENT_NAME } from "../type/index";


type sizeI = 28|48|56|60|64|72|80|92|96|224|320|480
type num = 1|2|3|4|5|6|7|8|9|10

type TransfornSize = {
    asp?: `ar_${number}:${number}`, 
    crop?: 'c_crop'|'c_fill',
    obj?: `g_auto:${string}`, 
    heigth?:  `h_${sizeI}`,
    width?: `w_${sizeI}`,
    bgrem?: 'e_bgremoval'|`co_white,e_make_transparent:${num}`,
    
}


export function changeValueImageSize(url:string, size?: TransfornSize): string {
    if (isObject(size)) {
        return url.replace(/upload\//, () => `upload/${ Object.values(size).join(',')}/`);
    } else { return url }
}


export function generateKey(data:object): string {
    return Object.entries(data).flat(1).map(el => isObject(el) ? generateKey(el): el).join(',')
}

export function checkDate(date:string, pastDate: number = 604800000): boolean {
   return new Date(date).getTime() > (Date.now() - pastDate)
}



type Model = {
    User: Prisma.UserUncheckedCreateInput;
    RefrechToken: Prisma.RefrechTokenUncheckedCreateInput;
    NFTCard: Prisma.NFTCardUncheckedCreateInput;
    Comment: Prisma.CommentUncheckedCreateInput;
    BlogCard: Prisma.BlogCardUncheckedCreateInput;
    Colection: Prisma.ColectionUncheckedCreateInput;
    Image: Prisma.ImageUncheckedCreateInput;
    Attributes: Prisma.AttributesUncheckedCreateInput
}
type f = Prisma.ModelName
type g = { [P in f]: Model[P] }

type modelProp = <T extends keyof Model, U extends keyof Model[T]>(key: T, prop: U) => U
export const modelProp: modelProp = (key, prop) => prop 


// export function deepConcat<T extends { [property: string]: any }>(dataAdd:T, dataDef: T): T {
//     for (let key of Object.keys(dataAdd)) {     
//         if (!dataDef.hasOwnProperty(key) || !isObject(dataDef[key])) {
//             dataDef[key] = dataAdd[key]
//         } else {
//             if (Array.isArray(dataDef[key]) && Array.isArray(dataAdd[key])) {
//                 dataDef[key] = dataDef[key].concat(dataAdd[key])
//             } else {
//                 deepConcat(dataAdd[key], dataDef[key])
//             }
//         }
//     }
//     return dataDef
// }


export function isNumber(elem: unknown): elem is number {
    return typeof unref(elem) === 'number'
}

export function isString(elem: unknown): elem is string {
    return typeof unref(elem) === 'string'
}

export function isBoolean(elem: unknown): elem is boolean {
    return typeof unref(elem) === 'boolean'
}

export function isObject(elem: unknown): elem is object {
    return typeof unref(elem) === 'object'
}

export function isNumeric(str: string): boolean {
    if (typeof str != "string") return false
    return !isNaN(str as never) && !isNaN(parseFloat(str))
}

export function test(...f:any) {
    console.log(...f);
}



export const sessionGet = (key: string) => sessionStorage.getItem(key)
export const sessionSet = (key: string, elem: any) => sessionStorage.setItem(key, JSON.stringify(elem))
export const sessionRemove = (key: string) => sessionStorage.removeItem(key)

type KeyLocalStorage = `${NAMEAPP}_basket`|`${NAMEAPP}_favorite`
export const localGet = (key: KeyLocalStorage) => localStorage.getItem(key)
export const localSet = (key: KeyLocalStorage, elem: any) => localStorage.setItem(key, JSON.stringify(elem))
export const localRemove = (key: KeyLocalStorage) => localStorage.removeItem(key)


export const GET_CONTENT_KEY = (key: CONTENT_KEY) => key
export const GET_CUSTOM_EVENT_NAME = (key: CUSTOM_EVENT_NAME) => key

export const getLanguageUser = (locale: string) => locale.split(',').map(_ => _.split(';')).filter(_ => _.length > 1 && _[0].split('-').length === 1).map(_ => [_[0],parseFloat(_[1].replace('q=','')) ])//.map(_ => _[0])

// export function initModelProperty<T extends keyof TypeMapFindMany>(
//     modelKey: T,
//     // modelPropElem: Array<keyof WhereInput>,
//     modelPropInt: (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.IntFilter>)[],
//     modelPropStr: (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.StringFilter>)[],
//     modelPropDateTime: (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.DateTimeFilter>)[],
//     propRelation: (keyof Required<NonNullable<TypeMapFindMany[T]['include']>>)[]
// ): {
//     modelKey: T,
//     modelKeyWork: Uncapitalize<T>,
//     modelPropElem: Array<(KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.IntFilter>) | (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.StringFilter>) | (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.DateTimeFilter>)>
//     modelPropInt: (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.IntFilter>)[],
//     modelPropStr: (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.StringFilter>)[],
//     modelPropDateTime: (KeysMatchingWrite<NonNullable<TypeMapFindMany[T]['where']>, Prisma.DateTimeFilter>)[],
//     propRelation: (keyof Required<NonNullable<TypeMapFindMany[T]['include']>>)[]
// } {
//     const modelKeyWork = modelKey.charAt(0).toUpperCase() + modelKey.slice(1) as Uncapitalize<T>
//     const modelPropElem = [...modelPropInt, ...modelPropStr, ...modelPropDateTime]
//     return { modelKey, modelKeyWork, modelPropElem, modelPropInt, modelPropStr, modelPropDateTime, propRelation }
// }

// type GG<K extends Prisma.ModelName> = TypeMapCreate[K]['data']

// export function INIT_MODEL_DATA<T extends Prisma.ModelName>(
//     key:T,
//     propRelation: Array<Exclude<keyof GG<T>, KeysMatchingWrite<GG<T>, number> | KeysMatchingWrite<GG<T>, string> | KeysMatchingWrite<GG<T>, Date>>>,
//     propDateTime: Array<KeysMatchingWrite<GG<T>, Date>>,
//     propInt: Array<KeysMatchingWrite<GG<T>, number>>,
//     propStr: Array<KeysMatchingWrite<GG<T>, string>>,
//     propElem: Array<keyof GG<T>>,
// ): {
//     key: T,
//     keyWork: Uncapitalize<T>,
//     propElem: typeof propElem
//     propInt: typeof propInt,
//     propStr: typeof propStr,
//     propDateTime: typeof propDateTime,
//     propRelation: typeof propRelation
// } 
// {
//     const keyWork = key.charAt(0).toUpperCase() + key.slice(1) as Uncapitalize<T>
//     return { key, keyWork, propElem, propInt, propStr, propDateTime, propRelation }
// }


