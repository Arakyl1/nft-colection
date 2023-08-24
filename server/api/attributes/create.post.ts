import { Currency, Prisma } from "@prisma/client";
import { INIT_MODEL_PROPERTY, getModelName } from "type";
import { INIT_MODEL_DATA, RelationProp, initRelationData } from "@/server/utils/other";
import prisma from "~~/server/db";


type MODEL_DATA_TYPE = INIT_MODEL_PROPERTY<'Attributes'>
const MODEL_DATA = INIT_MODEL_DATA<getModelName<'Attributes'>>(
    'Attributes',
    ['colection','blogCard','nftCardId'],
    [],
    ['id'],
    ['name'],
    ['id','name','colection','blogCard','nftCardId']
)


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const relationData = initRelationData<MODEL_DATA_TYPE['propRelation']>(MODEL_DATA.propRelation)
        const createData: NonNullable<Prisma.AttributesCreateInput> = {
            name: "",
            ...relationData
        }
       
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const value = body[key];
                if (MODEL_DATA.propElem.includes(key as never) && Object.keys(createData).includes(key)) {                
                    switch (key as MODEL_DATA_TYPE['propElem']) {
                        case 'name': {
                            createData[key as MODEL_DATA_TYPE['propStr']] = value as string
                            break;
                        }
                        // case 'colection':
                        // case 'blogCard':
                        // case 'nftCardId': {
                        //     if (isNumber(value) || isNumeric(value)) {
                        //         createData[key as MODEL_DATA_TYPE['propRelation']]!['connect'] = { 'id': parseInt(value as string) }
                        //     } else {
                        //         return ({ messageKey: GET_CONTENT_KEY('SERVER_ATTRIBUTES_CREATE_ERROR_INVALID_RELATION_ID') })
                        //     }
                        //     break;
                        // }
                        default :{
                            return ({ messageKey: GET_CONTENT_KEY('SERVER_ATTRIBUTES_CREATE_ERROR_UNKNOW_PROPERTY') })
                        }
                    }
                } else {
                    return ({ messageKey: GET_CONTENT_KEY('SERVER_ATTRIBUTES_CREATE_ERROR_UNKNOW_PROPERTY') })
                }
            }
        }

        const res = await prisma[MODEL_DATA.keyWork].create({ data: createData, select: { ...selectAttridute() } })
        if (res) {
            return { data: res }
        } else {
            return ({ messageKey: GET_CONTENT_KEY('SERVER_ATTRIBUTES_CREATE_ERROR') })
        }
    } catch (error) {
        console.error(error);
        return ({ messageKey: GET_CONTENT_KEY('SERVER_ATTRIBUTES_CREATE_ERROR') })
    }
})
