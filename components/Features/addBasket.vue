<template>
    <slot v-bind="{ addBasketProduct }">
    </slot>
</template>

<script setup lang="ts">
import { basketProduct } from "@/pinia/basket";

const props = withDefaults(defineProps<{
    id: number,
    quantity?: number
}>(), { quantity: 1 })

const store = basketProduct()
const { createAlert } = useAlert()

// methods
function addBasketProduct() {
    if (store.findProductInBasket(props.id) === -1) {
        store.addBasketProduct({ id: props.id, quantity: props.quantity })
        createAlert('Товар добавлен в корзину')
    } else {
        createAlert('Этот товар уже в ващей корзине')
    }

}
</script>