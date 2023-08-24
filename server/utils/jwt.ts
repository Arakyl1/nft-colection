import { H3Event } from "h3";
import jwt from "jsonwebtoken";
import { RuntimeConfig } from "@nuxt/schema";

const generateAccessToken = <T extends RuntimeConfig, U extends { id: PropertyKey }>(data: U, config: T) => {
    return jwt.sign({ id: data.id}, config.jwtAccessSecret, {
        expiresIn: '1h'
    })
}
const generateRefrechToken = <T extends RuntimeConfig, U extends { id: PropertyKey }>(data: U, config: T) => {
    return jwt.sign({ id: data.id}, config.jwtRefrechSecret, {
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

export const generateTokens = async<U extends { id: PropertyKey }>(data: U) => {
    const config = useRuntimeConfig()
    const accessToken = generateAccessToken(data, config)
    const refrechToken = generateRefrechToken(data, config)
    
    return {
        accessToken,
        refrechToken
    }
}

export const sendRefrechToken = async (event: H3Event, token: string | null) => {
    if (!token) return
    setCookie(event, "refrech_token", token, {
        httpOnly: true,
        sameSite: true
    })
}