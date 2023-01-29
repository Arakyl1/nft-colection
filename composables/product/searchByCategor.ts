export const searchByCategor = async(event: object, name: string) => {
    return await useAsyncData(name, () => $fetch('/api/product/cardNFT', {
        method: "POST",
        body: event
    }))
}