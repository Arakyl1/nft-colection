import { Prisma } from "@prisma/client";
import { INIT_MODEL_PROPERTY, getModelName } from "type";
import { INIT_MODEL_DATA, RelationProp, initRelationData } from "@/server/utils/other";
import prisma from "~~/server/db";


type MODEL_DATA_TYPE = INIT_MODEL_PROPERTY<'Comment'>
const MODEL_DATA = INIT_MODEL_DATA<getModelName<'Comment'>>(
    'Comment',
    ['author','blogCard','card','colection'],
    ['createAt'],
    ['rating'],
    ['text',],
    ['author','blogCard','card','colection','createAt','id','rating','text',]
)


export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const relationData = initRelationData<MODEL_DATA_TYPE['propRelation']>(MODEL_DATA.propRelation)
        const createData: NonNullable<Prisma.CommentCreateInput> = {
            rating: 0,
            text: '',
            ...relationData
        }
        console.log(body)
        
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const value = body[key];
                if (MODEL_DATA.propElem.includes(key as never) && Object.keys(createData).includes(key)) {                
                    switch (key as MODEL_DATA_TYPE['propElem']) {
                        case 'text': {
                            createData[key as MODEL_DATA_TYPE['propStr']] = value as string
                            break;
                        }
                        case 'rating': {
                            if (isNumber(value) || isNumeric(value)) {
                                createData[key as MODEL_DATA_TYPE['propInt'] as 'rating'] = parseInt(value as string) as number
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_COMMENT_CREATE_ERROR_INVALID_NUMBER_VALUE') })
                            }
                            break;
                        }
                        case 'blogCard':
                        case 'card':
                        case 'colection':
                        case 'author': {
                            if (isNumber(value) || isNumeric(value)) {
                                createData[(key as MODEL_DATA_TYPE['propRelation'] as 'author')]['connect'] = { 'id': parseInt(value as string) }
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_COMMENT_CREATE_ERROR_INVALID_RELATION_ID') })
                            }
                            break;
                        }
                        
                        default: {
                            return ({ messageKey: GET_CONTENT_KEY('SERVER_COMMENT_CREATE_ERROR_UNKNOW_PROPERTY') })
                        }
                    }
                } else {
                    return ({ messageKey: GET_CONTENT_KEY('SERVER_COMMENT_CREATE_ERROR_UNKNOW_PROPERTY') })
                }
            }
        }

        const res = await prisma[MODEL_DATA.keyWork].create({ data: createData, select: { ...selectComment() } })
        if (res) {
            return { data: res }
        } else {
            return ({ messageKey: GET_CONTENT_KEY('SERVER_COMMENT_CREATE_ERROR') })
        }
    } catch (error) {
        console.error(error);
        return ({ messageKey: GET_CONTENT_KEY('SERVER_COMMENT_CREATE_ERROR') })
    }
})