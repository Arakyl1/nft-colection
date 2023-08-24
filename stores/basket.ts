import { BasketItem } from "../type/index";

export const basket = defineStore('basket', () => {
    
    const data = ref<BasketItem[]>([])
    const localData = ref<{ quantity: number, id: number }[]>([])

    function updateData(newData: typeof data.value) {
        if (newData) {
            data.value = newData
        }
    }

    function addItem<T extends BasketItem>(item: T) { 
        data.value.push(item)
        const localDataUpdate = data.value.map(_ => ({ quantity: _.quantity, id: _.data.id }))
        localSet('NFT_MARKET_basket', localDataUpdate)
        localData.value = localDataUpdate
    }

    function findItem(id:number) {
        return data.value.find(el => el.data.id === id)
    }

    function removeItem(id: number) {
        data.value = data.value.filter(_ => _.data.id !== id)
        const localDataUpdate = data.value.map(_ => ({ quantity: _.quantity, id: _.data.id }))
        localSet('NFT_MARKET_basket', localDataUpdate)
        localData.value = localDataUpdate
    }

    
    onBeforeMount(() => {
        const localStorage = localGet('NFT_MARKET_basket')
        if (localStorage) {
            const localDataParse = JSON.parse(localStorage) as typeof localData.value
            const idCard = [... new Set([...localDataParse.map(_ => _.id)])]
            if (idCard.length === localDataParse.length) {
                localData.value = localDataParse
            } else {
                const mapBasket = new Map<number, typeof localData.value[number]>()
                for (let i = 0, l = localDataParse.length; i < l; i++) {
                    const item = localDataParse[i];
                    if (mapBasket.has(item.id)) {
                        const mapItem = mapBasket.get(item.id)
                        mapBasket.set(item.id, { id: item.id, quantity: mapItem!.quantity + item.quantity })
                    } else {
                        mapBasket.set(item.id, { id: item.id, quantity: item.quantity })
                    }
                }
                localData.value = [...mapBasket].map(_ => _[1])
                localSet('NFT_MARKET_basket', localData.value)
            }
        }
    })
    return { data, localData, updateData, addItem, findItem, removeItem }
})