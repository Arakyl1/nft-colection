import { Prisma } from "@prisma/client";
import { getWhereParamsCons, initFindParams, parceIncludeParams, parceOrderByParams, parseOtherArgs, parseSearchParams } from "@/server/utils/other";
import { selectColection, selectNFTCard, selectUser } from "@/server/utils/selectData";
import prisma from "~~/server/db";
import { KeysMatchingWrite, getModelName } from "~~/type";


type modelName = getModelName<'Attributes'>
const modelName: Uncapitalize<modelName> = 'attributes'
type ThisMainTypeWhereInput = Prisma.AttributesWhereInput
type ThisMainTypeSelect = Prisma.AttributesSelect
type ThisMainTypeInclude = Prisma.AttributesInclude

const propertyElem: Array<keyof ThisMainTypeWhereInput> = ['id', 'name']
type PropertyElemInt = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.IntFilter>
const PropertyElemInt: PropertyElemInt[] = ['id']
type PropertyElemString = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.StringFilter>
const PropertyElemString: PropertyElemString[] = ['name']
type PropertyElemDate = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.DateTimeFilter>
const PropertyElemDate: PropertyElemDate[] = []
type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'blogCard' | 'nftCardId' | 'colection'>
const keyPropElemRelation: keyPropElemRelation[] = ['blogCard', 'nftCardId', 'colection']

const includeElemSelectParams: ThisMainTypeInclude = {
    blogCard: {
        select: {
            ...selectBlogCard({ author: { select: selectUser() } }),
        }
    },
    nftCardId: {
        select: {
            ...selectNFTCard({ author: { select: { ...selectUser() } } }),
        }
    },
    colection: {
        select: {
            ...selectColection({ 'author': { select: { ...selectUser() } } })
        }
    }
}

const ElemFullDataKey: ThisMainTypeSelect = {
    id: true,
    name: true,
    blogCard: { include: { author: { select: selectUser() } } },
    nftCardId: { include: { author: { select: selectUser() } } },
    colection: true
}


function initAttriduteFindParams(...arg: Parameters<initFindParams>) {
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
        case 'id': {
            const res = getWhereParamsCons(value, getWhereParamsForInt)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        case 'name': {
            const res = getWhereParamsCons(value, getWhereParamsForString)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        default: {
            addError({ messadge: 'unknown operator 3' + key, type: 'error' })
        }
    }
}



export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    try {
        const resParseData = initFindParams(query as { [k: string]: string }, initAttriduteFindParams, ElemFullDataKey, keyPropElemRelation)
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

