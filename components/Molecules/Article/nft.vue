<template>
    <div class="shadow-lg 2xl:p-5 xl:p-4 p-3">
        <div class="relative">
            <img :src="data.img" alt="image">
            <div class="flex items-center absolute bottom-3 left-1/2 -translate-x-1/2
            md:py-2 py-1 md:px-4 px-2 bg-rose-600 rounded-lg opacity-90">
                <template v-for="(item, i) in infoData" :key="i">
                    <div v-if="'decorCircle' in item" class="xs:mx-2 mx-1 flex flex-col justify-around xs:h-10 h-6">
                        <div class="decor-circle"></div>
                        <div class="decor-circle"></div>
                    </div>
                    <div v-else class="text-center mx-2">
                        <p class="text-white md:text-sm sm:text-xs xs:text-base text-xs text-center mb-1">{{ item.name }}
                        </p>
                        <p class="text-white md:text-sm sm:text-xs xs:text-base text-xs text-center">{{ item.value }}</p>
                    </div>
                </template>
            </div>
        </div>
        <div class="py-4 flex">
            <div class="flex grow">
                <img src="@/assets/img/svg/icon/box.svg" alt="box" class="lg:w-7">
                <p class="text-rose-500 sm:text-sm xs:text-base text-sm px-2">{{
                    data.quantity ? `${data.quantity} Product Available` : 'Not Available Product'
                }}</p>
            </div>
            <div>
                <ClientOnly>
                    <AtomButtonStandart @click="storeFavorite.toggleItem(data.id)" class="p-0 after:content-none">
                        <CreateIcon name="like-2_22_22"
                            :att="{ class:  storeFavorite.findItem(data.id).value ? 'fill-rose-600 stroke-rose-500' : 'stroke-stone-900 fill-transparent' }" />
                    </AtomButtonStandart>
                </ClientOnly>
            </div>
        </div>
        <div class="flex mb-6">
            <div class="aspect-square w-10 rounded-full overflow-hidden">
                <img :src="data.author.profileImage" alt="profileImage">
            </div>
            <div class="grow md:px-3 px-2">
                <p class="md:text-base sm:text-sm xs:text-lg text-base">{{ data.author.name }}</p>
                <p class="sm:text-xs xs:text-base text-xs">@{{ data.author.username }}</p>
            </div>
            <div class="text-right">
                <p class="sm:text-xs xs:text-base text-xs">Current Bid</p>
                <p class="md:text-base sm:text-sm xs:text-lg text-sm">{{ data.price + " " + data.currency }}</p>
            </div>
        </div>
        <div class="text-center ">
            <AtomButtonStandart @click="addBasket({ 'data': { ...data }, quantity: 1 })" :disabled="data.quantity <= 0"
                class="button-2 border-slate-700 text-slate-700 sm:text-base text-lg sm:py-1 xs:py-2 py-1 sm:px-6 px-10">
                Price Bid
            </AtomButtonStandart>
        </div>
    </div>
</template>

<script setup lang="ts">
import { NFTCard, User } from '@prisma/client';
import { basket as _basket } from "@/stores/basket";
import { alert as _alert } from "@/stores/alert";
import { favorite as _favorite } from "@/stores/favorite";
import CreateIcon from "@/content/icons/create";
import { Content } from 'type';


interface ProductCard extends NFTCard {
    [x: string]: any;
    author: User
}

const _content = useState<Content>('CONTENT_APP')
const props = defineProps<{ data: ProductCard }>()
const storeAlert = _alert()
const storeBasket = _basket()
const storeFavorite = _favorite()

function addBasket(item: Parameters<typeof storeBasket['addItem']>[0]) {
    if (storeBasket.findItem(item.data.id)) {
        storeAlert.create({ 'text': _content.value?.ALERT_BASKET_PRODUCT_IS_ALREADY_THERE || null, state: 'info' })
    } else {
        storeBasket.addItem({ quantity: item.quantity, data: item.data })
        storeAlert.create({ 'text': _content.value?.ALERT_BASKET_ADD_ITEM || null, state: 'info' })
    }
}

const infoData = [
    { name: 'D', value: '365 ' },
    { decorCircle: true },
    { name: 'H', value: '23 ' },
    { decorCircle: true },
    { name: 'M', value: '55 ' },
    { decorCircle: true },
    { name: 'S', value: '25 ' }
]
</script>