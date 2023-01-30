
export const register = async(event: string) => {
    const { createAlert} = useAlert()
    const { updateUser } = useStoreUser()
    const { updateAccessToken } = useAccessToken()

    try {
        const data = await $fetch('/api/auth/register', {
            method: "POST",
            body: event
        })

        if ('message' in data && data.message) return createAlert(data.message)

        updateUser(data.user)
        updateAccessToken(data.access_token)
        createAlert('Пользователь зарегистрирован')
        return true
    } catch (error: any) {
        console.log(error);
    }
}
