import { Prisma } from "@prisma/client";
import prisma from "@/server/db";
import { getWhereParamsCons, initFindParams, parceIncludeParams, parceOrderByParams, parseOtherArgs, parseSearchParams } from "@/server/utils/other";
import { selectAttridute, selectNFTCard, selectUser, selectComment } from "@/server/utils/selectData";
import { KeysMatchingWrite, getModelName } from "~~/type";


//                 case key === 'attridute': {
//     findParams.where.AND.push({ attribute: { some: { id: parseInt(value as string) } } } as never)
//     break;
// }
            
//                 case key === 'other': {
//     const arrValue = (value as string).split(',')
//     for (let i = 0, l = arrValue.length; i < l; i++) {
//         const value = arrValue[i];
//         findParams.where.AND.push({ attribute: { some: { name: value } } } as never)
//     }
//     break;
// }

//                 case key === 'rating': {
//     const params: Prisma.Enumerable<Prisma.ColectionWhereInput> = { reviews: { 'some': { rating: { gte: value ? parseInt(value) : 0 } } } }
//     findParams.where.AND.push(params as never)
//     break;
// }



type modelName = getModelName<'Colection'>
const modelName: Uncapitalize<modelName> = 'colection'
type ThisMainTypeWhereInput = Prisma.ColectionWhereInput
type ThisMainTypeSelect = Prisma.ColectionSelect
type ThisMainTypeInclude = Prisma.ColectionInclude

const propertyElem: Array<keyof ThisMainTypeWhereInput> = ['id', 'authorId', 'createAt', 'text', 'title', 'views']
type PropertyElemInt = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.IntFilter>
const PropertyElemInt: PropertyElemInt[] = ['id', 'authorId', 'views']
type PropertyElemString = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.StringFilter>
const PropertyElemString: PropertyElemString[] = ['text', 'title']
type PropertyElemDate = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.DateTimeFilter>
const PropertyElemDate: PropertyElemDate[] = ['createAt']
type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'attributes' | 'author' | 'nFTCard' | 'reviews'>
const keyPropElemRelation: keyPropElemRelation[] = ['attributes', 'author', 'nFTCard', 'reviews']

type GG<T extends keyof ThisMainTypeSelect> = { [P in T]: { [L in keyof ThisMainTypeSelect[P]]: any } }
const includeElemSelectParams: ThisMainTypeInclude = {
    attributes: {
        select: {
            ...selectAttridute()
        }
    },
    author: { select: selectUser() },
    reviews: { select: { ...selectComment({ author: { select: { ...selectUser() } } }) } },
    nFTCard: { select: { ...selectNFTCard({ author: { select: { ...selectUser() } } }) } }
}

const ElemFullDataKey: ThisMainTypeSelect = {
    id: true,
    text: true,
    title: true,
    views: true,
    createAt: true,
    ...includeElemSelectParams
}


function initColectionFindParams(...arg: Parameters<initFindParams>) {
    const key = arg[0]
    const value = arg[1]
    const addParams = arg[2]
    const addError = arg[3]

    const _key = key as PropertyElemInt | PropertyElemString | PropertyElemDate | 'limit' | 'page' | 'include' | 'orderBy' | 'search'
    switch (_key) {
        case 'limit': {
            const resParse = parseOtherArgs('take' as never, value)
            console.log(resParse)
            if (resParse.error.length) {
                resParse.error.forEach(_ => addError(_))
            } else {
                addParams('take', resParse.data.take)
            }
            break;
        }
        case 'page': {
            const resParse = parseOtherArgs('skip' as never, value)
            if (resParse.error.length) {
                resParse.error.forEach(_ => addError(_))
            } else {
                addParams('skip', resParse.data.skip)
            }
            break;
        }
        case 'search': {
            const res = parseSearchParams(value, propertyElem)
            if (res.OR.length) {
                addParams('where', res)
            }
            break;
        }
        case 'orderBy': {
            const res = parceOrderByParams(value, propertyElem)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('orderBy', res.data)
            }
            break;
        }
        case 'include': {
            const res = parceIncludeParams<ThisMainTypeInclude>(value, includeElemSelectParams)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('include', res.data)
            }
            break
        }
        case 'id':
        case 'views': {
            const res = getWhereParamsCons(value, getWhereParamsForInt)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        case 'title':
        case 'text': {
            const res = getWhereParamsCons(value, getWhereParamsForString)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        default: {
            addError({ messadge: 'unknown operator ' + key + ' main', type: 'error' })
        }
    }
}



export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    try {
        const resParseData = initFindParams(query as { [k: string]: string }, initColectionFindParams, ElemFullDataKey, keyPropElemRelation)
        if (resParseData.error.length) {
            return { data: null, error: resParseData.error[0] }
        } else {
            if (resParseData.unique) {
                const resData = await prisma[modelName].findUnique({
                    where: resParseData.params.where,
                    select: resParseData.params.select
                } as never)
                return { data: resData }
            } else {
                const resData = await prisma[modelName].findMany({
                    ...resParseData.params,
                    skip: resParseData.params.skip <= 0 ? 0 : (resParseData.params.skip - 1) * resParseData.params.take
                } as never)
                if (resData.length === resParseData.params.take) {
                    const resDataNext = await prisma[modelName].findMany({
                        where: resParseData.params.where,
                        skip: resParseData.params.skip * resParseData.params.take,
                        take: resParseData.params.take,
                        select: { id: true }
                    })
                    return { data: resData, nextPageLength: resDataNext.length ? resDataNext.length : 0 }
                } else {
                    return { data: resData, nextPageLength: 0 }
                }
            }
        }

    } catch (error: any) {
        return { data: null, error: null }
    }
})
