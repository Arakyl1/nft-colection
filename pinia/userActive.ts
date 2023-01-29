export const userActive = defineStore('userActive', () => {
    const userData = ref<object | null>(null)

    function updateActiveUser(user: object | null) {
        userData.value = user
    }
    return { userData, updateActiveUser }
})