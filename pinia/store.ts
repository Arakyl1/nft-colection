export const alertContent = defineStore('alertContent', () => {
    const content = ref<string>('')
    const alertActive = ref<boolean>(false)
    
    function updateContent(cont: string) {
        content.value = cont

        setTimeout(() => {
            alertActive.value = true
        }, 500);
        setTimeout(() => {
            alertActive.value = false
        }, 4000);
    }

    return { content, alertActive, updateContent }
})

export const windowMask = defineStore('windowMask', () => {
    const active = ref<boolean>(false)

    function updateActive(stage: boolean = !active.value) {
        active.value = stage
    }
    return { active, updateActive }
})

export const userActive = defineStore('userActive', () => {
    const userData = ref<object | null>(null)

    function updateActiveUser(user: object | null) {
        userData.value = user
    }
    return { userData, updateActiveUser }
})

export const accessToken = defineStore('accesshToken', () => {
    const accessToken = ref<string>('')

    function updateAccessToken(token: string) {
        accessToken.value = token        
    }
    return { accessToken, updateAccessToken }
})

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