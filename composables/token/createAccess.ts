export const createAccess = async() => {
    const { updateAccessToken } = useAccessToken()
    try {
        const data = await $fetch('/api/auth/refrech')
       
        if (data.statusCode && data.statusCode > 400) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage: data.statusMessage
            })
        }
     
        updateAccessToken(data.accessToken ? data.accessToken : '')
        
    } catch (error) {
        console.log(error);

    }
}