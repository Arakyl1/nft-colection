
import { User } from "@/utils/type";
export const userActive = defineStore('userActive', () => {
    const userData = ref<User | null>(null)

    function updateActiveUser(user: User | null) {
        userData.value = user
    }
    return { userData, updateActiveUser }
})
