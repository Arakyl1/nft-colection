export const getData = async() => {
    const { accessToken } = useAccessToken()
    const { updateUser } = useStoreUser()

    try {
        const data = await $fetch('/api/auth/user', {
            headers: {
                method: "GET",
                Authorization: `Bearer ${accessToken.value}`
            }
        })
        if ( data.statusCode ? data.statusCode >= 400 : false) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage: data.statusMessage
            })
        }
        updateUser(data.user)   
    } catch (error) {
        throw error
    }
}