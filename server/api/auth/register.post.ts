import { H3Event } from "h3"
import bcryptjs from "bcryptjs";
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";
import { prismaCreate } from "~~/server/db/methods";
import { userTransform } from "~~/server/utils/userTransform";

interface User {
    name?: string,
    email: string,
    username: string,
    password: string,
    profileImage: string
}


export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody(event)
    const { username, email, password, repeartPassword } = body

    const userData = {
        username,
        email,
        password,
        profileImage: "https://ie.wampi.ru/2023/01/26/avatar.jpg"
    }

    try {
        const salt = bcryptjs.genSaltSync(10);
        const updateUserData = {
            ...userData,
            password: bcryptjs.hashSync(userData.password, salt)
        }
        
        
        const user = await prismaCreate('user', { data: updateUserData , select: {
                id: true,
                email: true,
                name: true,
                username: true,
                profileImage: true,
            }
        })
        
        // Generate Token
        try {
            const { accessToken, refrechToken } = await generateTokens(user)
            
            prismaCreate('refrechToken', { data: { token: refrechToken, userId: user.id }})
            
            sendRefrechToken(event, refrechToken)

            return {
                access_token: accessToken,
                user: user
            }
        } catch (error) {
            return {
                access_token: '',
                user: userTransform(user)
            }
        }

    } catch (error) {
        return { message: "Такой пользователь уже существует" }
       // return sendError(event, createError({ statusCode: 400, statusMessage: "Такой пользователь уже существует" }))
    }
})
