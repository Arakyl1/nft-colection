<template>
    <UIButtomStan
    class="w-10/12 rounded-full border border-slate-700 py-1 text-slate-700
    after:content-none hover:bg-rose-500 hover:border-rose-500 hover:text-white transition-all"
    @click="addBasketProduct">
        Price Bid
    </UIButtomStan>
</template>

<script setup lang="ts">
import { basketProduct, alertContent } from "@/pinia/store";

const props = withDefaults(defineProps<{
    id: number,
    quantity?: number
}>(), { quantity: 1 })

const store = basketProduct()
const alert = alertContent()

// methods
function addBasketProduct() {
    if (store.findProductInBasket(props.id) === -1) {
        store.addBasketProduct({ id: props.id, quantity: props.quantity })
        alert.updateContent('Товар добавлен в корзину')
    } else {
        alert.updateContent('Этот товар уже в ващей корзине')
    }
    
}
</script>