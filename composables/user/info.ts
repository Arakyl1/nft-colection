export const getInfo = async(event:object) => {
    try {
        return await $fetch('/api/auth/userInfo', {
            method: 'POST',
            body: event
        })
    } catch (error) {
        console.log(error);
    }
}