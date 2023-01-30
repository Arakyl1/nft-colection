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
        if ('message' in data && data.message) return new Error('Error')

        updateUser(data.user ? data.user : null)   
    } catch (error) {
        throw new Error('Error')
    }
}