export const createItem = async (key:string, event:object) => {
    return await useAsyncData(key, () => $fetch('/api/blog/create', {
        method: "POST",
        body: event
    }))
}