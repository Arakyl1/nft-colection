export const createCardNFT = async (event: object) => {
    const { createAlert} = useAlert()
    try {
        const data = await $fetch('/api/product/create', {
            method: 'POST',
            body: event
        })
        if ('statusCode' in data) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage: data.statusMessage
            })
        }
        createAlert('Товар добавлен')
        return data
    } catch (error) {
        console.error(error);
    }
}
