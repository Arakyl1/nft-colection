import { Prisma } from "@prisma/client";
import prisma from "~~/server/db";
import { KeysMatchingWrite, getModelName } from "~~/type";
import { selectBlogCard, selectColection, selectNFTCard, selectRefrechToken, selectUser } from "@/server/utils/selectData";
import { getWhereParamsCons, initFindParams, parceIncludeParams, parceOrderByParams, parseOtherArgs, parseSearchParams } from "@/server/utils/other";

type modelName = getModelName<'User'>
const modelName: Uncapitalize<modelName> = 'user'
type ThisMainTypeWhereInput = Prisma.UserWhereInput
type ThisMainTypeSelect = Prisma.UserSelect
type ThisMainTypeInclude = Prisma.UserInclude

const propertyElem: Array<keyof ThisMainTypeWhereInput> = ['id','createAt','email','name','profileImage','quote','ranting','username']
type PropertyElemInt = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.IntFilter>
const PropertyElemInt: PropertyElemInt[] = ['id','ranting']
type PropertyElemString = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.StringFilter>
const PropertyElemString: PropertyElemString[] = ['email','name','profileImage','quote','username']
type PropertyElemDate = KeysMatchingWrite<ThisMainTypeWhereInput, Prisma.DateTimeFilter>
const PropertyElemDate: PropertyElemDate[] = ['createAt']
type keyPropElemRelation = keyof Pick<ThisMainTypeInclude, 'blogcard' | 'card' | 'colection' | 'followedBy' | 'following' | 'refrechToken' | 'reviews'>
const keyPropElemRelation: keyPropElemRelation[] = ['reviews', 'colection', 'card', 'followedBy', 'following' , 'refrechToken','blogcard']

type GG<T extends keyof ThisMainTypeSelect> = { [P in T]: { [L in keyof ThisMainTypeSelect[P]]: any } }
const includeElemSelectParams: ThisMainTypeInclude = {
    blogcard: { select: { ...selectBlogCard() } },
    card: { select: { ...selectNFTCard() } },
    colection: { select: { ...selectColection() } },
    followedBy: { select: { ...selectUser() } },
    following: { select: { ...selectUser() } },
    refrechToken: { select: { ...selectRefrechToken() } },
    reviews: { select: { ...selectComment() } }
}

const ElemFullDataKey: ThisMainTypeSelect = {
    ...selectUser(),
    ...includeElemSelectParams
}


function initUserFindParams(...arg: Parameters<initFindParams>) {
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
        case 'ranting': {
            const res = getWhereParamsCons(value, getWhereParamsForInt)
            if (res.error.length) {
                res.error.forEach(_ => addError(_))
            } else {
                addParams('where', { [key]: res.data })
            }
            break;
        }
        case 'email':
        case 'name':    
        case 'username': {
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
        const resParseData = initFindParams(query as { [k: string]: string }, initUserFindParams, ElemFullDataKey, keyPropElemRelation)
        if (resParseData.error.length) {
            return { data: null, error: resParseData.error[0] }
        } else {
            if (resParseData.unique) {
                const resData = await prisma[modelName].findUnique({
                    where: resParseData.params.where,
                    select: resParseData.params.select
                } as never)
                return { data: resData ? userTransform(resData) : null }
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
                    return { data: resData.map(_ => userTransform(_)), nextPageLength: resDataNext.length ? resDataNext.length : 0 }
                } else {
                    return { data: resData.map(_ => userTransform(_)), nextPageLength: 0 }
                }
            }
        }

    } catch (error: any) {
        console.log(error)
        return { data: null, error: null }
    }
})

