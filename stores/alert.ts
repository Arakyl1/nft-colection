export const alert = defineStore('alert', () => {

    type Data = { text: string | number | null, state: 'info' | 'error' | 'success' | 'base', active: boolean, createAt: number }
    const data = ref<Data[]>([])

    function create(item: Pick<Data, 'state' | 'text'>) {
        if (item && item.text) {
            const createItem = { ...item, active: true, createAt: Date.now() }
            data.value.unshift(createItem)
        }
    }

    function updateData() {
        if (data.value.length) {
            const valueTime = Date.now() - data.value.find((_,i,a) => i === (a.length - 1))!.createAt - 6000
            setTimeout(() => {
                const newData = data.value.slice(0, -1)
                data.value = newData
                if (newData.length) {
                    updateData()
                }
            }, Math.abs(valueTime));
        }
    }

    function removeItem(time: number) {
        const findItemIndex = data.value.findIndex(_ => _.createAt === time)
        if (findItemIndex !== -1) {
            data.value = data.value.filter((_, i) => i !== findItemIndex)
        }
    }

    watch(() => data.value.length, (newV, oldV) => {
        if (oldV === 0) {
            updateData()
        }
    })

    return { data, create, removeItem }
})
