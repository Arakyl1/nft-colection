<template>
    <div class="py-32">
        <OtherElseSectionHeader>
            <template #title>Add NFT</template>
        </OtherElseSectionHeader>
        <div class="grid grid-cols-3 gap-x-8">
            <div @click="input?.click()">
                <div v-if="!inputImage"
                    class="aspect-square border border-rose-600 border-double bg-purple-200 rounded-3xl flex justify-center items-center">
                    <p class="text-xl text-stone-700 font-medium">Кликните, чтобы добавить фото</p>
                    <input type="file" accept="image/png, image/jpeg" ref="input" hidden @change="imageChange">
                </div>
                <div v-else>
                    <img :src="inputImage" alt="">
                </div>
            </div>
            <div class="col-start-2 col-end-4">
                <form class="text-right">
                    <div class="flex border border-rose-500 rounded-full overflow-hidden mb-8">
                        <input type="number" class="px-5 py-3 text-xl w-full focus-visible:outline-0"
                        v-model="NFTdata.price" placeholder="Укажите стоимоть и выберете валюту">
                        <div class="px-6 bg-rose-500 cursor-pointer flex items-center">
                            <select v-model="NFTdata.currency" ref="select"
                            class="bg-rose-500 focus-visible:outline-0 text-white text-xl px-2">
                                <option>Sel.</option>
                                <option v-for="item in currency" :key="item"
                                class="text-white text-xl "
                                >{{  item }}</option>
                            </select>
                        </div>
                        
                    </div>
                    <div class="flex border border-rose-500 rounded-full overflow-hidden mb-8">
                        <input type="text" class="px-5 py-3 text-xl w-full focus-visible:outline-0"
                        v-model="inputAttributes" placeholder="Добавить атрибут">
                        <ButtomStandart @click="addAttributes"
                        class="px-12 rounded-none bg-rose-500 text-white">
                            Add
                        </ButtomStandart>
                    </div>
                    <div>
                        <ul class="flex flex-wrap">
                            <li v-for="item in (NFTdata.attributes || [])" :key="item"
                            class="text-xl text-stone-700 px-4">{{ item  }}</li>
                        </ul>
                    </div>
                    <ButtomStandart @click="createCard"
                    class="bg-rose-600 text-white text-xl rounded-full px-20"
                    >Create</ButtomStandart>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { userActive, alertContent } from "@/pinia/store";

const userActiveFun = userActive()
const alertContentFun = alertContent()
const { userData } = storeToRefs(userActiveFun)
const { createCardNFT } = useProduct()
const input = ref<HTMLElement | null>(null)
const select = ref<HTMLElement | null>(null)
const inputImage = ref<string | ArrayBuffer | null | undefined>(null)
const NFTdata = ref<any>(createData())
const inputAttributes = ref<string>('')
const currency = ['ETH', "BTS", "USD"]

const validData = computed(() => {
    return Object.values(NFTdata.value).filter(el => el === '' || el <= 0 || el === 'Sel.').length
})

function addAttributes() {
    if (inputAttributes.value === '') return
    NFTdata.value.attributes.push(inputAttributes.value)
    inputAttributes.value = ''
}

async function imageChange(event: any) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
        inputImage.value = event.target?.result
    }
    reader.readAsDataURL(file)

    const image = await useFetch('/api/cloudinari/upload', {
        method: "POST",
        body: file,
        headers: {
            "Content-Type": "application/octet-stream"
        }
    })
    NFTdata.value.img = image.data.value[0].secretUrl
}
async function createCard() {
    if (userData.value) {
        NFTdata.value.authorId = userData.value.id
        if (!validData.value) {
            await createCardNFT({ data: NFTdata.value })
        } else {
            alertContentFun.updateContent('Заполните все поля')
        }
    } else {
        alertContentFun.updateContent('Чтобы добавить товар, авторизуйтесь')
    }
}
</script>