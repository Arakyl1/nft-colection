import { Prisma } from "@prisma/client"


export const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
    select: {
        id: true,
        name: true,
        username: true,
        email: true,
        profileImage: true,
        createAt: true,
    },
})

export type _UserPersonalData = Prisma.UserGetPayload<typeof userPersonalData>



export const userTransform = <T extends _UserPersonalData>(user: T): _UserPersonalData => {
    if ('password' in user) {
        delete(user.password)
        return user
    }
    return user
}
