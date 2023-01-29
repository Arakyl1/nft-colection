<template>
    <slot v-bind="{ addProducFavorite, checkIdInFavorites }">

    </slot>
</template>

<script setup lang="ts">
import { favoriteProduct } from "@/pinia/favorite";

const props = withDefaults(defineProps<{ id: number }>(), { id: 0 })

const favoriteProductFun = favoriteProduct()
const { favorite } = storeToRefs(favoriteProductFun)

function addProducFavorite() {
    favoriteProductFun.updateFavorite(props.id)
}
const checkIdInFavorites = computed(() => favorite.value.has(props.id))
</script>