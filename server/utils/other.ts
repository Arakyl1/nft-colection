import { Prisma } from "@prisma/client";
import { CONTENT_KEY, INIT_MODEL_PROPERTY, KeysMatchingWrite, MethodError, TypeMapCreate, WhereDateFilterKey, WhereIntFilterKey, WhereSrtingFilterKey, keyOtherOption, keyStringMode, sortOrder } from "~~/type/index";


export function isNumber(elem: unknown): elem is number {
    return typeof elem === 'number'
}

export function isString(elem: unknown): elem is string {
    return typeof elem === 'string'
}

export function isBoolean(elem: unknown): elem is boolean {
    return typeof elem === 'boolean'
}

export function isObject(elem: unknown): elem is object {
    return typeof elem === 'object'
}
export function isNumeric(str: string): boolean {
    if (typeof str != "string") return false
    return !isNaN(str as never) && !isNaN(parseFloat(str))
}

export const generateHash = (str: string, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 3466434635);
        h2 = Math.imul(h2 ^ ch, 1455412567);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 1512527365);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 7467224255);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 1534960323);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 2375237522);

    return 9528367296 * (2098527 & h2) + (h1 >>> 0);
};

export const GET_CONTENT_KEY = (key: CONTENT_KEY) => key
export const getKeyPropElemRelation = <T>(t: T) => t
export function checkStrBollean(str: string) {
    return str === 'false' ? undefined : str
}

type getWhereParamsConsFn = (item: string[],
    addParams: (key: string, value: any) => any,
    addError: (mes: { messadge: string, type: 'error' }) => any
) => any
export function getWhereParamsCons(str: string, fn: getWhereParamsConsFn) {
    const methodError: MethodError[] = []
    const findParams: { [x: string]: any } = {}
    const parseStr = str.split(';').map(_ => _.split(':'))

    function addParams(key: string, value: any) {
        findParams[key] = value
    }

    function addError(mes: { messadge: string, type: 'error' }) {
        methodError.push(mes)
    }

    if (parseStr.length && parseStr[0].length > 1) {
        for (let i = 0, l = parseStr.length; i < l; i++) {
            const item = parseStr[i];
            fn(item, addParams, addError)
        }
        return { data: findParams, error: methodError }
    } else { return { data: str, error: methodError } }
}


export function getWhereParamsForString(...arg: Parameters<getWhereParamsConsFn>) {
    const item = arg[0]
    const addParams = arg[1]
    const addError = arg[2]
    if (item.length === 2) {
        if (WhereSrtingFilterKey.includes(item[0] as never)) {
            const key = item[0] as WhereSrtingFilterKey
            switch (key) {
                case 'equals':
                case 'gt':
                case 'gte':
                case 'lt':
                case 'lte':
                case 'not':
                case 'startsWith':
                case 'endsWith':
                case 'contains': {
                    addParams(key, item[1])
                    break;
                }
                case 'in':
                case 'notIn': {
                    const value = item[1].split(',')
                    if (value.length) {
                        addParams(key, value)
                        break
                    }
                    addError({ messadge: `invalid value '${item[1]}', must be 'dog,cat,mouse'`, type: 'error' })
                    break
                }
                case 'mode': {
                    if (keyStringMode.includes(item[1] as never)) {
                        addParams(key, item[1])
                        break
                    }
                    addError({ messadge: `invalid params '${item[1]}', must be a '${keyStringMode.join(',')}'`, type: 'error' })
                    break
                }
                default: {
                    addError({ messadge: `unknown params '${key}'`, type: 'error' })
                    break;
                }
            }
        } else {
            addError({ messadge: `unknown operator '${item[0]}'`, type: 'error' })
        }
    } else {
        addError({ messadge: `invalid params '${item.join(' ')}', must be 'gte:cats'`, type: 'error' })
    }
}


export function getWhereParamsForInt(...arg: Parameters<getWhereParamsConsFn>) {
    const item = arg[0]
    const addParams = arg[1]
    const addError = arg[2]
    if (item.length === 2) {
        if (WhereIntFilterKey.includes(item[0] as never)) {
            const key = item[0] as WhereIntFilterKey

            switch (key) {
                case 'equals':
                case 'gt':
                case 'gte':
                case 'lt':
                case 'lte':
                case 'not': {
                    const value = parseFloat(item[1])
                    if (typeof value === 'number') {
                        addParams(key, value)
                    }
                    break;
                }
                case 'in':
                case 'notIn': {
                    const value: number[] = item[1].split(',').map(_ => parseFloat(_)).filter(_ => typeof _ === 'number')
                    if (value.length) {
                        addParams(key, value)
                        break
                    }
                    addError({ messadge: `invalid value '${item[1]}', must be '1,2,34.5'`, type: 'error' })
                    break
                }
                default: {
                    addError({ messadge: `unknown params '${key}'`, type: 'error' })
                    break;
                }
            }
        } else {
            addError({ messadge: `unknown operator '${item[0]}'`, type: 'error' })
        }
    } else {
        addError({ messadge: `invalid params '${item.join(' ')}', must be 'gte:45'`, type: 'error' })
    }
}

export function getWhereParamsForDate(...arg: Parameters<getWhereParamsConsFn>) {
    const item = arg[0]
    const addParams = arg[1]
    const addError = arg[2]
    if (item.length === 2) {
        if (WhereDateFilterKey.includes(item[0] as never)) {
            const key = item[0] as WhereDateFilterKey
            switch (key) {
                case 'equals':
                case 'gt':
                case 'gte':
                case 'lt':
                case 'lte':
                case 'not': {
                    const value = isNumeric(item[1]) ? new Date(parseInt(item[1])) : new Date(item[1])
                    if (value instanceof Date) {
                        addParams(key, value)
                    }
                    break;
                }
                case 'in':
                case 'notIn': {
                    const value: Date[] = item[1].split(',').map(_ => isNumeric(_) ? new Date(parseInt(_)) : new Date(_)).filter(_ => _ instanceof Date)
                    if (value.length) {
                        addParams(key, value)
                        break
                    }
                    addError({ messadge: `invalid value '${item[1]}', must be 'Thu Aug 17 2023 00:33:24 GMT+0300' or '1692221629651'`, type: 'error' })
                    break
                }
                default: {
                    addError({ messadge: `unknown params '${key}'`, type: 'error' })
                    break;
                }
            }
        } else {
            addError({ messadge: `unknown operator '${item[0]}'`, type: 'error' })
        }
    } else {
        addError({ messadge: `invalid params '${item.join(' ')}', must be 'gte:Thu Aug 17 2023 00:33:24 GMT+0300' or 'gte:1692221629651'`, type: 'error' })
    }
}

export function parceIncludeOption(value: string) {
    const methodError: MethodError[] = []
    const option: { [x: string]: any } = {}
    const data = value.split('_').slice(1).map(_ => _.split(';').map(e => e.split(':')))[0]
    if (data) {
        for (let k = 0, kL = data.length; k < kL; k++) {
            const item = data[k];
            if (item.length === 2) {
                const key = item[0] as keyOtherOption
                switch (key) {
                    case 's': {
                        if (isNumeric(item[1])) {
                            option.skip = parseInt(item[1])
                        } else {
                            methodError.push({ messadge: `invalid value '${item[1]}', must be a '45' or 45`, type: 'error' })
                        }
                        break;
                    }
                    case 't': {
                        if (isNumeric(item[1])) {
                            option.take = parseInt(item[1])
                        } else {
                            methodError.push({ messadge: `invalid value '${item[1]}', must be a '45' or 45`, type: 'error' })
                        }
                        break;
                    }
                    default: {
                        methodError.push({ messadge: 'unknown operator ' + key, type: 'error' })
                    }
                }
            } else {
                methodError.push({ messadge: `invalid params '${item.join(' ')}', must be 's:45' or 's:23;t:12'`, type: 'error' })
            }
        }
    }
    return { data: option, error: methodError }
}

type includeElemSelectParams<T extends string> = { [K in T]: { [k: string]: any } }
export function parceIncludeParams<T extends { [k:string]: any }>(value: string, includeElemSelectParams: T) {
    const methodError: MethodError[] = []
    const finallValue = value.split(',')
    const ElementRelationKeyName = Object.keys(includeElemSelectParams) as unknown as keyof T[]
    let includeParams = {} as T

    for (let i = 0, l = finallValue.length; i < l; i++) {
        const str = finallValue[i];
        const keyElem = ElementRelationKeyName.find((_: string) => str.startsWith(_))
        if (keyElem) {
            const otherOption = parceIncludeOption(str)
            if (otherOption.error.length) {
                otherOption.error.forEach(_ => methodError.push(_))
            } else {
                includeParams = Object.assign(includeParams, { [keyElem]: { ...includeElemSelectParams[keyElem], ...otherOption.data } }) 
            }
        } else {
            methodError.push({ messadge: `unknown params include '${str}'`, type: 'error' })
        }
    }
    return { data: includeParams, error: methodError }
}

export function parceOrderByParams(value: string, propArr: (string | number | Date)[]) {
    const orderByParams: { [k: string]: any } = {}
    const methodError: MethodError[] = []
    let data = value.split(';').map(_ => _.split(':'))
    if (data.length) {
        for (let i = 0, l = data.length; i < l; i++) {
            const item = data[i];
            if (item.length === 2) {
                if (propArr.includes(item[0])) {
                    if (sortOrder.includes(item[1] as never)) {
                        orderByParams[item[0]] = item[1]
                    } else {
                        methodError.push({ messadge: `unknown value '${item[1]}', available values '${sortOrder.join(',')}`, type: 'error' })
                    }
                } else {
                    methodError.push({ messadge: `unknown property '${item[0]}', available property '${propArr.join(',')}`, type: 'error' })
                }
            } else {
                methodError.push({ messadge: `invalid value '${item.join(' ')}', must be 'id:asc' or 'id:asc;name:desc`, type: 'error' })
            }
        }
    }
    return { data: orderByParams, error: methodError }
}

type ParseOtherArgs = 'take' | 'skip'
const parseOtherArgsArr: ParseOtherArgs[] = ['take','skip']

export function parseOtherArgs(key: ParseOtherArgs, value: string) {
    const otherParams: { [k: string]: any } = {}
    const methodError: MethodError[] = []
    if (parseOtherArgsArr.includes(key)) {
        const resChe = checkStrBollean(value)
        const finallValue = resChe && isNumeric(value) ? parseInt(value as string) : undefined
        otherParams[key] = finallValue
    } else {
        methodError.push({ messadge: `unknown property '${key}', available property '${parseOtherArgsArr.join(',')}`, type: 'error' })
    }
    return { data: otherParams, error: methodError }
}

type parseSearchParams<T extends string, K extends string> = { OR: { [P in T]: { [L in K ]: string } }[] }
export function parseSearchParams<T extends string>(value:string, propNameForSearch: T[]): parseSearchParams<T, keyof Required<Pick<Prisma.StringFilter, 'contains'|'mode'>>>  {
    const strSerchParams = propNameForSearch.map(_ => ({ [_]: { contains: value,  mode: 'insensitive', }}))
    return { OR: strSerchParams as never }
}

export type initFindParams = (key: string, value: string,
    addParams: (key: "include" | "where" | "orderBy" | "take" | "skip", value: any) => any,
    addError: (mes: MethodError) => any
) => any
export function initFindParams<ModelName extends Prisma.ModelName>(
    query: { [k: string]: string },
    funParseFindMany: initFindParams,
    elemFullDataKey: { [k: string]: any },
    keyPropElemRelation: string[]
) {
    const methodError: MethodError[] = []

    function addError(data: Parameters<Parameters<initFindParams>['3']>[0]) {
        methodError.push(data)
    }
    
    if ('unique' in query) {
        const findParams = {
            where: { id: 0 },
            select: undefined
        }
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                const value = query[key];
                switch (key) {
                    case 'id':{
                        if (isNumeric(value)) {
                            findParams.where.id = parseInt(value as string) as never
                        } else {
                            addError({ 'messadge': `invalid value '${value}', must be '45'`, type: 'error' })
                        }
                        break;
                    }
                    case 'fullinfo': {
                        findParams.select = elemFullDataKey as never
                        break;
                    }
                    default: {
                        addError({ messadge: `unknow key ${key}`, type: 'error' })
                        break;
                    }
                }
            }
        }
        return { params: findParams, error: methodError, unique: true }
    } else {
        const findParams = {
            
            where: {
                'AND': [],
            },
            take: 12,
            skip: 0,
            orderBy: {},
            include: Object.fromEntries(keyPropElemRelation.map(_ => [_, false])) as { [k: string]: never }
                
        }
       
        function addParams(key: keyof typeof findParams, value: { [x:string]: any }) {
            if (Object.keys(findParams).includes(key)) {
                if (key === 'where') {
                    findParams.where.AND.push(value as never)
                } else {
                    findParams[key] = value as never
                }
            }
        }
    
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                const value = query[key];
                funParseFindMany(key, value, addParams, addError)
            }
        }
        return { params: findParams, error: methodError, unique: false }
    }
}



export function INIT_MODEL_DATA<T extends Prisma.ModelName>(
    key: INIT_MODEL_PROPERTY<T>['key'],
    propRelation: Array<INIT_MODEL_PROPERTY<T>['propRelation']>,
    propDateTime: Array<INIT_MODEL_PROPERTY<T>['propDateTime']>,
    propInt: Array<INIT_MODEL_PROPERTY<T>['propInt']>,
    propStr: Array<INIT_MODEL_PROPERTY<T>['propStr']>,
    propElem: Array<INIT_MODEL_PROPERTY<T>['propElem']>,
): {
    key: typeof key,
    keyWork: INIT_MODEL_PROPERTY<T>['keyWork'],
    propElem: typeof propElem
    propInt: typeof propInt,
    propStr: typeof propStr,
    propDateTime: typeof propDateTime,
    propRelation: typeof propRelation
} 
{
    const keyWork = key.charAt(0).toUpperCase() + key.slice(1) as Uncapitalize<T>
    return { key, keyWork, propElem, propInt, propStr, propDateTime, propRelation }
}


export function checkValidImageData<T extends { link: string, main: boolean }>(data: T | T[]): boolean  {
    let res
    if (Array.isArray(data)) {
        const findRes = data.find(_ => !('link' in _ && 'main' in _ && isString(_.link) && isBoolean(_.main)))
        res = (findRes ? false : data.find(_ => _.main === true ? true : false))
        
    } else {
        res = ('link' in data && 'main' in data && isString(data.link) && isBoolean(data.main) && data.main === true)
    }
    return res ? true : false
}

export const RelationProp = {
    create: undefined,
    connectOrCreate: undefined,
    connect: undefined
}

export function initRelationData<T extends string>(data: T[]): { [P in T]: typeof RelationProp } {
    return Object.fromEntries(data.map(_=> [_,{ ...RelationProp}])) as { [P in T]: typeof RelationProp }
}

const res = initRelationData(['auu', 'asf', 'asf'])
