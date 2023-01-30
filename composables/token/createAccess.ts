export const createAccess = async() => {
    const { updateAccessToken } = useAccessToken()
    try {
        const data = await $fetch('/api/auth/refrech')
       
        if ('message' in data && data.message) {
            console.log(data.message);
            return 
        }
     
        updateAccessToken(data.accessToken ? data.accessToken : '')
    } catch (error) {
        console.log(error);

    }
}