import jwt from "jsonwebtoken";

const generateAsccessToken = (user: any, config: any) => {

    return jwt.sign({ userId: user.id}, config.jwtAccessSecret, {
        expiresIn: '1h'
    })
}
const generateRefrechToken = (user: any, config: any) => {
    return jwt.sign({ userId: user.id}, config.jwtRefrechSecret, {
        expiresIn: '4h'
    })

}

export const decodeRefrechToken = (token: string) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.jwtRefrechSecret)
    } catch (error) {
        return null
    }
}

export const decodeAccessToken = (token: string) => {
    const config = useRuntimeConfig()

    try {
        return jwt.verify(token, config.jwtAccessSecret)
    } catch (error) {
        return null
    }
}

export const generateTokens = async(user: any) => {
    const config = useRuntimeConfig()

    const accessToken = generateAsccessToken(user, config)
    const refrechToken = generateRefrechToken(user, config)
    
    return {
        accessToken,
        refrechToken
    }
}

export const sendRefrechToken = async (event, token) => {
    setCookie(event, "refrech_token", token, {
        httpOnly: true,
        sameSite: true
    })
}