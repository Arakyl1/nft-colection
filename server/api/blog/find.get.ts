import { Prisma } from "@prisma/client";
import prisma from "~~/server/db";
import { KeysMatchingWrite, getModelName } from "~~/type";
import { selectColection, selectNFTCard, selectUser } from "@/server/utils/selectData";
import { getWhereParamsCons, initFindParams, parceIncludeParams, parceOrderByParams, parseOtherArgs, parseSearchParams } from "@/server/utils/other";

type modelName = getModelName<'BlogCard'>
const modelName: Uncapitalize<modelName> = 'blogCard'
type ThisMainTypeWhereInput = Prisma.BlogCardWhereInput
type ThisMainTypeSelect = Prisma.BlogCardSelect
type ThisMainTypeInclude = Prisma.BlogCardInclude

const propertyElem: Array<keyof ThisMainTypeWhereInput> = ['id', 'authorId', 'createAt','text','title']
type PropertyElemInt = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.IntFilter>
const PropertyElemInt: PropertyElemInt[] = ['id','authorId']
type PropertyElemString = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.StringFilter>
const PropertyElemString: PropertyElemString[] = ['text','title']
type PropertyElemDate = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.DateTimeFilter>
const PropertyElemDate: PropertyElemDate[] = ['createAt']
type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'attributes' | 'author' | 'image' | 'reviews'>
const keyPropElemRelation: keyPropElemRelation[] = ['attributes','author','image','reviews']

type GG<T extends keyof ThisMainTypeSelect> = { [P in T]: { [L in keyof ThisMainTypeSelect[P]]: any } }
const includeElemSelectParams: ThisMainTypeInclude = {
    attributes: { select: { ...selectAttridute() } },
    'author': { select: { ...selectUser() } },
    image: { select: { ...selectImage() } },
    reviews: { select: { ...selectComment() } },
}

const ElemFullDataKey: ThisMainTypeSelect = {
    ...selectComment(),
    ...includeElemSelectParams
}


function initCommentFindParams(...arg: Parameters<initFindParams>) {
    const key = arg[0]
    const value = arg[1]
    const addParams = arg[2]
    const addError = arg[3]

    const _key = key as PropertyElemInt | PropertyElemString | PropertyElemDate | 'limit' | 'page' | 'include' | 'orderBy'
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
            const res = parceIncludeParams<typeof includeElemSelectParams>(value, includeElemSelectParams)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('include', res.data)
            }
            break
        }
        case 'id':
        case 'authorId':{
            const res = getWhereParamsCons(value, getWhereParamsForInt)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        case 'title':
        case 'text':{
            const res = getWhereParamsCons(value, getWhereParamsForString)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        case 'createAt':{
            const res = getWhereParamsCons(value, getWhereParamsForDate)
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
        const resParseData = initFindParams(query as { [k: string]: string }, initCommentFindParams, ElemFullDataKey, keyPropElemRelation)
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
        console.log(error)
        return { data: null, error: null }
    }
})

