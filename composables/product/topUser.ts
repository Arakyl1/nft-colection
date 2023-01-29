export const getTopUser = async (event: object) => {
    try {
        const data =  await $fetch('/api/product/cardUser', {
            method: "POST",
            body: event
        })
        if ('statusCode' in data) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage: data.statusMessage
            })
        }
        return data
    } catch (error) {
        console.error(error);
    }
}