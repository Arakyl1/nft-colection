export const accessToken = defineStore('accesshToken', () => {
    const accessToken = ref<string>('')

    function updateAccessToken(token: string) {
        accessToken.value = token        
    }
    return { accessToken, updateAccessToken }
})
