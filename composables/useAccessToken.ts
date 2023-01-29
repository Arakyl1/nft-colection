import { accessToken as storeToken } from "~~/pinia/accessToken";

export default () => {
    const access = storeToken();
    const { accessToken } = storeToRefs(access)

    const updateAccessToken = (data: string) => {
        access.updateAccessToken(data)
    }
    return { updateAccessToken, accessToken }
}