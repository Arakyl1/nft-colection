
export const register = async(event: Event) => {
    const { createAlert} = useAlert()
    const { updateUser } = useStoreUser()
    const { updateAccessToken } = useAccessToken()

    try {
        const data = await $fetch('/api/auth/register', {
            method: "POST",
            body: event
        })

        if (data.statusCode ? data.statusCode >= 400 : false) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage:data.statusMessage
            })
        }

        updateUser(data.user ? data.user : {})
        updateAccessToken(data.access_token ? data.access_token : '')
        createAlert('Пользователь зарегистрирован')
        return true
    } catch (error: any) {
        console.log(error);
        createAlert(error.statusMessage)
    }
}
