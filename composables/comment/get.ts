export default async (key:string, event:object) => {
    return await useAsyncData(key, () => $fetch('/api/comment/get', {
        method: "POST",
        body: event
    }))
}