export const logout = async() => {
    const { updateUser } = useStoreUser()
    const { updateAccessToken } = useAccessToken()

    try {
        await $fetch('/api/auth/logout', {method: "POST"})
        updateUser(null)
        updateAccessToken('')
    } catch (error) {
        console.log(error);   
    }
}