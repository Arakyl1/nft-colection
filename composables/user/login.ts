export const login = async (event: object) => {
    const { createAlert } = useAlert()
    const { updateUser } = useStoreUser()
    const { updateAccessToken } = useAccessToken()

    try {
        const data = await $fetch('/api/auth/login', {
            method: 'POST',
            body: event
        })
  
        if ('message' in data && data.message) return createAlert(data.message)
        
        updateUser(data.user ? data.user : null)
        updateAccessToken(data.access_token)
        createAlert('Вы успешно вошли в свой акаунт')
        return true
    } catch (error) {
        console.log(error);
    }
}