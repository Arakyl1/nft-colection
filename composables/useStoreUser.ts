import { userActive } from "@/pinia/userActive";

export default () => {
    const user = userActive();
    const { userData } = storeToRefs(user)
    const updateUser = (data: object | null) => { 
        user.updateActiveUser(data)
    }
    return { updateUser, userData }
}