<template>
    <div class="py-8">
        <SharedSectionHeader>
            <template #title>Add NFT</template>
        </SharedSectionHeader>
        <div class="grid lg:grid-cols-3 xl:gap-8 gap-6 mb-12 grid-cols-1">
            <EntitiesDownloadImg :reset="reset" @link-img="(e) => { NFTdata.img = e }"/>
            <div class="lg:col-start-2 lg:col-end-4">
                <form class="text-right">
                    <div class="flex border border-rose-500 rounded-full overflow-hidden mb-8">
                        <input type="number" class="px-5 py-3 lg:text-xl sm:text-lg w-full focus-visible:outline-0"
                        v-model="NFTdata.price" placeholder="Укажите стоимоть и выберете валюту">
                        <div class="px-6 bg-rose-500 cursor-pointer flex items-center">
                            <select v-model="NFTdata.currency" ref="select"
                            class="bg-rose-500 focus-visible:outline-0 text-white lg:text-xl sm:text-lg  md:px-2 px-1">
                                <option class="lg:text-xl sm:text-lg">Sel.</option>
                                <option v-for="item in currency" :key="item"
                                class="text-white lg:text-xl sm:text-lg"
                                >{{  item }}</option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="flex border border-rose-500 rounded-full overflow-hidden mb-8">
                        <input type="text" class="px-5 py-3 lg:text-xl sm:text-lg w-full focus-visible:outline-0"
                        v-model="inputAttributes" placeholder="Добавить атрибут">
                        <UIButtomStan @click="addAttributes"
                        class="md:px-12 px-11 rounded-none bg-rose-500 text-white md:py-4 py-3">
                            Add
                        </UIButtomStan>
                    </div>
                    <div>
                        <ul class="flex flex-wrap">
                            <li v-for="item in (NFTdata.attributes.create || [])" :key="item.name"
                            class="text-xl text-stone-700 px-4">{{ item.name  }}</li>
                        </ul>
                    </div>
                    <UIButtomStan @click="createCard"
                    class="bg-rose-600 text-white text-xl rounded-full px-20"
                    >Create</UIButtomStan>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const { createAlert } = useAlert()
const { userData } = useStoreUser()

const select = ref<HTMLElement | null>(null)
const NFTdata = ref<any>(createData())
const inputAttributes = ref<string>('')
const currency = ['ETH', "BTS", "USD"]
const reset = ref<boolean>(false)

const validData = computed(() => {
    return Object.values(NFTdata.value).filter(el => el === '' || el <= 0 || el === 'Sel.').length
})

function addAttributes() {
    if (inputAttributes.value === '') return
    NFTdata.value.attributes.create.push({ name: inputAttributes.value.trim() })
    inputAttributes.value = ''
}

async function createCard() {
    if (userData.value) {
        NFTdata.value.authorId = userData.value.id
        if (!validData.value) {
            const res = await productCreateCard({ data: NFTdata.value })
            if (res) {
                NFTdata.value = createData()
                resetImage()
            }
        } else {
            createAlert('Заполните все поля')
        }
    } else {
        createAlert('Чтобы добавить товар, авторизуйтесь')
    }
}
const resetImage = () => reset.value = !reset.value
</script>