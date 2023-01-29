export const getDataByAttrebutes = async (key:string, event:object) => {
    return await useAsyncData(key, () => $fetch('/api/blog/get', {
        method: "POST",
        body: event
    }))
}