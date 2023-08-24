import { UserBase } from "~~/type/intex"

export const userActive = defineStore('userActive', () => {
    const userData = ref<UserBase | null>(null)

    function updateActiveUser(user: UserBase | null) {
        userData.value = user
    }
    return { userData, updateActiveUser }
})