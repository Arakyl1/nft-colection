import { describe, it, expect } from 'vitest';
import { getWhereParamsForString, getWhereParamsForInt, getWhereParamsCons, getWhereParamsForDate, parceIncludeOption, parceIncludeParams, parceOrderByParams, parseOtherArgs, parseSearchParams, initFindParams, initAttriduteFindParams } from "@/server/utils/other";
import { selectUser, selectNFTCard, selectColection } from 'server/utils/selectData';
import { checkValidImageData } from 'utils/other';

describe('Test parce url params', () => {

  it('Check where params for string', () => {
    expect(getWhereParamsCons('gt:cat', getWhereParamsForString)).toEqual({ data: { gt: 'cat' }, error: [] })
    expect(getWhereParamsCons('lt:45;mode:insensitive', getWhereParamsForString)).toEqual({ data: { lt: '45', mode: 'insensitive' }, error: [] })
    expect(getWhereParamsCons('lt:45,mode:insensitive', getWhereParamsForString)).toEqual({
      data: {}, error: [
        { messadge: `invalid params 'lt 45,mode insensitive', must be 'gte:cats'`, type: 'error' }
      ]
    })
  })


  it('Check where params for int', () => {
    expect(getWhereParamsCons("gt:45", getWhereParamsForInt)).toEqual({ data: { gt: 45 }, error: [] })
    expect(getWhereParamsCons("lt:45;lte:245", getWhereParamsForInt)).toEqual({ data: { lt: 45, lte: 245 }, error: [] })
    expect(getWhereParamsCons("lt:45,let:444", getWhereParamsForInt)).toEqual({
      data: {}, error: [
        { messadge: `invalid params 'lt 45,let 444', must be 'gte:45'`, type: 'error' }
      ]
    })
  })

  it('Check where params for Date', () => {
    expect(getWhereParamsCons("gt:45", getWhereParamsForDate)).toEqual({ data: { gt: new Date(45) }, error: [] })
    expect(getWhereParamsCons("lt:45;lte:2454464635546", getWhereParamsForDate)).toEqual({ data: { lt: new Date(45), lte: new Date(2454464635546) }, error: [] })
    expect(getWhereParamsCons("lt:45,let:444", getWhereParamsForDate)).toEqual({
      data: {}, error: [
        { messadge: `invalid params 'lt 45,let 444', must be 'gte:Thu Aug 17 2023 00:33:24 GMT+0300' or 'gte:1692221629651'`, type: 'error' }
      ]
    })
  })
});

describe("Test parse url include params", () => {
  it('include option', () => {
    expect(parceIncludeOption('attri_s:23;t:45')).toEqual({ data: { skip: 23, take: 45 }, error: [] })
    expect(parceIncludeOption('blogCard')).toEqual({ data: {}, error: [] })
  })

  it('include params', () => {
    const includeElemSelectParams = {
      blogCard: {
        select: {
          id: true,
          text: true,
          author: { select: selectUser() }
        }
      },
      nftCardId: {
        select: {
          ...selectNFTCard({ author: { select: { ...selectUser() } } }),
        }
      },
      colection: { select: {
        ...selectColection({ 'author': { select: { ...selectUser() } } }) }
      }
    }

    expect(parceIncludeParams('blogCard', includeElemSelectParams)).toEqual({ data: { blogCard: { ...includeElemSelectParams['blogCard']  } }, error: [] })


    expect(parceIncludeParams('blogCard_s:45;t45', includeElemSelectParams)).toEqual({
      data: {}, error: [{ messadge: "invalid params 't45', must be 's:45' or 's:23;t:12'", "type": "error", }]
    })
    
    const responseTestThere = { blogCard: { ...includeElemSelectParams['blogCard'], skip: 45, take: 45 } }
    expect(parceIncludeParams('blogCard_s:45;t:45', includeElemSelectParams)).toEqual({ data: responseTestThere, error: [] })

    const responseTestFour = {
      blogCard: { ...includeElemSelectParams['blogCard'], skip: 45, take: 45 },
      nftCardId: { ...includeElemSelectParams['nftCardId'] }
    }
    expect(parceIncludeParams('blogCard_s:45;t:45,nftCardId', includeElemSelectParams)).toEqual({ data: responseTestFour, error: [] })
  })

  it('orderBy params', () => {
    const propData = ['id', 'name']
    expect(parceOrderByParams('id:asc', propData)).toEqual({ data: { id: 'asc' }, error: [] })
    expect(parceOrderByParams('id:asc;name:desc', propData)).toEqual({ data: { id: 'asc', name: 'desc' }, error: [] })
    expect(parceOrderByParams('id:asc,name:dec', propData)).toEqual({ data: {}, error: [{ messadge: "invalid value 'id asc,name dec', must be 'id:asc' or 'id:asc;name:desc", type: 'error' }] })
  })

  it('other Args', () => {
    expect(parseOtherArgs('take', '45')).toEqual({ data: { take: 45 }, error: [] })
    expect(parseOtherArgs('takes', '45')).toEqual({ data: {}, error: [{ messadge: "unknown property 'takes', available property 'take,skip", type: "error" }] })
    expect(parseOtherArgs('take', 'true')).toEqual({ data: { take: undefined }, error: [] })
  })


  it('serch parcer params', () => {
    const propertyElem = ['id', 'name']
    expect(parseSearchParams('cat', propertyElem)).toEqual({
      OR: [
        { id: { contains: 'cat', mode: 'insensitive' } },
        { name: { contains: 'cat', mode: 'insensitive' } }
      ]
    })
  })

  // it('full parser url params', () => {
  //   const searchPar = { id: '45', name: 'gt:45;lt:fg', include: 'blogCard_t:45;s:56', orderBy: 'id:asc', search: 'name' }
  //   const ElemFullDataKey = {
  //     id: true,
  //     name: true,
  //     blogCard: { include: { author: { select: selectUser() } } },
  //     nftCardId: { include: { author: { select: selectUser() } } },
  //     colection: true
  //   }
  //   const keyPropElemRelation = ['blogCard', 'nftCardId', 'colection']
  //   expect(initFindParams(searchPar, initAttriduteFindParams, ElemFullDataKey, keyPropElemRelation)).toEqual({ id: 45 })
  // })
})


describe('Check valid create data for blod card', () => {
  it('Check valid image', () => {
    expect(checkValidImageData({ link: 'sdsjgsdg', main: true })).toBe(true)
    expect(checkValidImageData([{ lin: 'sdsjgsdg', main: true }, { link: 'sdsjgsdg', main: true }])).toBe(false)
    expect(checkValidImageData([{ link: 'sdsjgsdg3', main: true }, { link: 'sdsjgsdg', main: false }])).toBe(true)
  })
})

describe('Other Test', () => {
  it('dd', () => {
    
  })
})