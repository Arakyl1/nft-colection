export const login = async (event: Event) => {
    const { createAlert} = useAlert()
    const { updateUser } = useStoreUser()
    const { updateAccessToken } = useAccessToken()
    
    try {
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: event
        })
    
        if ('statusCode' in data ? data.statusCode >= 400 : false) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage: data.statusMessage
            })
        }

        updateUser(data.user ? data.user : {})
        updateAccessToken(data.access_token ? data.access_token : '')
        createAlert('Вы успешно вошли в свой акаунт')
        return true
    } catch (error) {
        createAlert(error.statusMessage)
    }
}