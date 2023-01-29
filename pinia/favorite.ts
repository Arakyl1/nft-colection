export const favoriteProduct = defineStore('favoriteProduct', () => {

    const favorite = ref(new Set([]))

    onBeforeMount(() =>{
        const localStorage = myGetItem('favorite')
        if (localStorage) {
            favorite.value = new Set(JSON.parse(localStorage))
        }
    })

    function updateFavorite(id: number) {
        if (!favorite.value.has(id)) {
            favorite.value.add(id)
        } else {
            favorite.value.delete(id)
        }
        mySetItem('favorite', [...favorite.value])
    }

    return { favorite, updateFavorite }
})
