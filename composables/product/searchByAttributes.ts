export const searchByAttributes = async (event: object, name: string) => {
    return await useAsyncData(name, () => $fetch('/api/attributes/searchByAttributes', {
        method: "POST",
        body: event
    }))
}