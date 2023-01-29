export const basketProduct = defineStore('basketProduct', () => {
    
    const basket = ref<any>([])

    function addBasketProduct(item: object) { 
        basket.value.push(item)
        mySetItem('basket', basket.value)
    }

    function findProductInBasket(id:number) {
        return basket.value.findIndex(el => el.id === id)
    }

    function removeBasketProduct(index: number) {
        basket.value.splice(index, 1)
        mySetItem('basket', basket.value)
    }

    onBeforeMount(() => {
        const localStorage = myGetItem('basket')
        if (localStorage) {
            basket.value = JSON.parse(localStorage)
        }
    })
    return { basket, addBasketProduct, removeBasketProduct, findProductInBasket }
})