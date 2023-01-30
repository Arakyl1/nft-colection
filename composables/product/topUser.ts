export const getTopUser = async (event: object) => {
    try {
        const data =  await $fetch('/api/product/cardUser', {
            method: "POST",
            body: event
        })
        if ('message' in data && data.message) {
           return console.log(data.message);
        }
        return data
    } catch (error) {
        console.error(error);
    }
}