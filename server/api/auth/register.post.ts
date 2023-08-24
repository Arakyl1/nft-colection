import { H3Event } from "h3"
import bcrypt from 'bcryptjs';
import { Prisma } from "@prisma/client";
import prisma from "~/server/db";
import { userPersonalData, userTransform } from "~/server/utils/userTransform";
import { generateTokens, sendRefrechToken } from "~~/server/utils/jwt";
import { GET_CONTENT_KEY } from "../../utils/other";

export default defineEventHandler(async(event: H3Event) => {
    const body = await readBody<Pick<Prisma.UserCreateInput, 'email'|'password'|'username'>>(event)

    const appConfing = useRuntimeConfig()
    const { username, email, password } = body

    try {
        const salt = bcrypt.genSaltSync(10);
        const userCreateData = Prisma.validator<Prisma.UserCreateArgs>()({
            data: {
                username,
                email,
                profileImage: appConfing.public.linkPhotoUserBase,
                password: bcrypt.hashSync(password, salt)
            },
            select: userPersonalData.select
        })

        const user = await prisma.user.create(userCreateData)
        // add ConnecticHash

        // Generate Token
        try {
            if (user) {
                const { accessToken, refrechToken } = await generateTokens({ id: user.id })
                await prisma.refrechToken.create({ data: { token: refrechToken, userId: user.id }})
                sendRefrechToken(event, refrechToken)
                return {
                    access_token: accessToken,
                    user: userTransform(user)
                }
            }
        } catch (error) {
            return {
                access_token: '',
                user: userTransform(user)
            }
        }

    } catch (error) {
        return { messageKey: GET_CONTENT_KEY('AUTH_REGISTER_SUCH_USER_ALREADY_EXISTS')}
    }
})
