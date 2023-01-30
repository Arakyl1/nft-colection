export const searchByCategor = async(key:string, event:object) => {
    try {
        return await useAsyncData(key, () => $fetch('/api/colection/byCategor', {
            method: 'POST',
            body: event
        }))
    } catch (error) {
        console.log(error);
    }
}