import { Prisma } from "@prisma/client";
import { INIT_MODEL_PROPERTY, getModelName } from "type";
import { INIT_MODEL_DATA, RelationProp, checkValidImageData, initRelationData } from "@/server/utils/other";
import prisma from "~~/server/db";


type MODEL_DATA_TYPE = INIT_MODEL_PROPERTY<'BlogCard'>
const MODEL_DATA = INIT_MODEL_DATA<getModelName<'BlogCard'>>(
    'BlogCard',
    ['attributes','author','image','reviews'],
    ['createAt'],
    ['id'],
    ['text','title'],
    ['createAt','id','text','title','image','attributes','author','reviews']
)



export default defineEventHandler(async(event) => {
    const body = await readBody(event)
    try {
        const relationData = initRelationData<MODEL_DATA_TYPE['propRelation']>(MODEL_DATA.propRelation)
        const createData: NonNullable<Prisma.BlogCardCreateInput> = {
            title: "",
            text: "",
            ...relationData
        }
        console.log(body)
        type KEY_PROP_BLOG_CARD = keyof typeof createData
        for (const key in body) {
            if (Object.prototype.hasOwnProperty.call(body, key)) {
                const value = body[key];
                if (MODEL_DATA.propElem.includes(key as never) && Object.keys(createData).includes(key)) {                
                    switch (key as KEY_PROP_BLOG_CARD) {
                        case 'title':
                        case 'text': {
                            createData[key as KEY_PROP_BLOG_CARD] = value as string
                            break;
                        }
                        case 'author': {
                            if (isNumber(value) || isNumeric(value)) {
                                createData['author']['connect'] = { 'id': parseInt(value as string) }
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR_USER_ID') })
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
                        case 'image': {
                            if (checkValidImageData(value)) {
                                createData['image']!.create = value
                            } else {
                                return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR_IMAGE_DATA') })
                            }
                            break;
                        }
                        default :{
                            return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR_UNKNOW_PROPERTY') })
                        }
                    }
                } else {
                    return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR_UNKNOW_PROPERTY') })
                }
            }
        }

        const res = await prisma[MODEL_DATA.keyWork].create({ data: createData, select: { ...selectBlogCard() } })
        if (res) {
            return { data: res }
        } else {
            return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR') })
        }
    } catch (error) {
        console.error(error);
        return ({ messageKey: GET_CONTENT_KEY('SERVER_BLOG_CREATE_ERROR') })
    }
})