export default async (event: object) => {
    const { createAlert} = useAlert()
    try {
        const data = await $fetch('/api/comment/create', {
            method: 'POST',
            body: event
        })
        if ('message' in data && data.message) {
            createAlert('Возникла ошибка')
        }
        createAlert('Коментарий добавлен')
        return data
    } catch (error) {
        console.error(error);
    }
}