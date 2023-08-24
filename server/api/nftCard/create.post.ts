import { Currency, Prisma } from "@prisma/client";
import { INIT_MODEL_PROPERTY, getModelName } from "type";
import { INIT_MODEL_DATA, RelationProp, initRelationData } from "@/server/utils/other";
import prisma from "~~/server/db";


type MODEL_DATA_TYPE = INIT_MODEL_PROPERTY<"NFTCard">
const MODEL_DATA = INIT_MODEL_DATA<getModelName<'NFTCard'>>(
    'NFTCard',
    ['attributes','author','reviews','colection'],
    ['createAt'],
    ['id','price','quantity'],
    ['img'],
    ['createAt','id','img','attributes','author','reviews','colection','price','quantity','currency']
)


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const relationData = initRelationData<MODEL_DATA_TYPE['propRelation']>(MODEL_DATA.propRelation)
        const createData: NonNullable<Prisma.NFTCardCreateInput> = {
            img: "",
            price: 0,
            quantity: 0,
            ...relationData,
            currency: 'USD',
        }

       
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const value = body[key];
                if (MODEL_DATA.propElem.includes(key as never) && Object.keys(createData).includes(key)) {                
                    switch (key as MODEL_DATA_TYPE['propElem']) {
                        case 'img': {
                            createData[key as MODEL_DATA_TYPE['propStr']] = value as string
                            break;
                        }
                        case 'id':
                        case 'price': 
                        case 'quantity':  {
                            if (isNumber(value) || isNumeric(value)) {
                                createData[key as MODEL_DATA_TYPE['propInt'] as 'price'] = parseInt(value as string) as number
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR_INVALID_NUMBER_VALUE') })
                            }
                            break;
                        }
                        case 'author': {
                            if (isNumber(value) || isNumeric(value)) {
                                createData[(key as MODEL_DATA_TYPE['propRelation'] as 'author')]['connect'] = { 'id': parseInt(value as string) }
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR_INVALID_RELATION_ID') })
                            }
                            break;
                        }
                        case 'attributes': {
                            if (isString(value)) {
                                const attributesArr = value.split(';')
                                createData['attributes']!['connectOrCreate'] = attributesArr.map(_ => ({ 'where': { 'name': _ }, create: { name: _ } }))
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR_USER_ID') })
                            }
                            break;
                        }
                        case 'currency': {
                            const currency: Currency[] = ['BTS','ETH','USD']
                            if (currency.includes(value)) {
                                createData['currency'] = value
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR_INVALID_CURRENCY') }) 
                            }
                            break;
                        }
                        default :{
                            return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR_UNKNOW_PROPERTY') })
                        }
                    }
                } else {
                    return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR_UNKNOW_PROPERTY') })
                }
            }
        }

        console.log({ ...createData })
        const res = await prisma[MODEL_DATA.keyWork].create({ data: { ...createData }, select: { ...selectNFTCard() } })
        if (res) {
            return { data: res }
        } else {
            return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR') })
        }
    } catch (error) {
        console.error(error);
        return ({ messageKey: GET_CONTENT_KEY('SERVER_NFT_CARD_CREATE_ERROR') })
    }
})