export const createCardNFT = async (event: object) => {
    const { createAlert} = useAlert()
    try {
        const data = await $fetch('/api/product/create', {
            method: 'POST',
            body: event
        })
        if ('message' in data && data.message) {
            return console.log(data.message);
        }
        
        createAlert('Товар добавлен')
        return data
    } catch (error) {
        console.error(error);
    }
}
