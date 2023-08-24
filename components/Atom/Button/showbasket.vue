<template>
    <slot v-bind="{ showModalBasket, basketData }">
        <AtomButtonStandart class="p-0 " @click="showModalBasket" >
            <CreateIcon :name="'basket_24_24'" :att="{ class: `${basketData.length ? 'fill-red-500 stroke-red-500' : 'fill-gray-500 stroke-gray-500'} stroke-[0.3px]` }"/>
        </AtomButtonStandart>
    </slot>
</template>

<script setup lang="ts">
import { basket as _basket } from "@/stores/basket";
import CreateIcon from "@/content/icons/create";

const storeBasket = _basket()
const { data: basketData } = storeToRefs(storeBasket)

function showModalBasket() {
    window.dispatchEvent(new CustomEvent('show-modal-basket'))
}
</script>