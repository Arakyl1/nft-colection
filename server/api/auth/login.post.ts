import { prismaFindUnique } from "../../db/methods";
import { generateTokens, sendRefrechToken } from "../../utils/jwt";
import bcryptjs from "bcryptjs";
import { prismaCreate } from "~~/server/db/methods";
import { userTransform } from "~~/server/utils/userTransform";
import { returnParamsMain, returnParamsAditional } from "@/server/utils/searchParams";

export default defineEventHandler(async(event) => {
    const body = await readBody(event)

    const { username, password } = body 

    const searchParams = returnParamsMain({ username: username }, returnParamsAditional({ password: true }))
  
    const user = await prismaFindUnique('user', searchParams)

    if (!user) {
        return { statusCode: 400, statusMessage: 'Такой пользователь на зарегистрирован' }
    }

    const doesThePaswordMatch = await bcryptjs.compare(password, user.password)


    if (!doesThePaswordMatch) {
        return { statusCode: 400, statusMessage: 'Некорректный пароль' }
    }
    // Generate Token

    const { accessToken, refrechToken } = await generateTokens(user)

    prismaCreate('refrechToken', { data: { token: refrechToken, userId: user.id } })

    // await updateRefrechToken({id: user.id, token: refrechToken})
    sendRefrechToken(event, refrechToken)

    return  {
        access_token: accessToken,
        user: userTransform(user)
    }
})