<template>
    <UIButtomStan
    class="p-0 after:content-none"
    @click="addProducFavorite">
        <UIIconLike class="group" :class="[[ favorite.has(id) ? 'icon-rose' : 'icon-black']]"/>
    </UIButtomStan>
</template>

<script setup lang="ts">
import { favoriteProduct } from "@/pinia/store";

const props = withDefaults(defineProps<{ id: number }>(), { id: 0 })

const favoriteProductFun = favoriteProduct()
const { favorite } = storeToRefs(favoriteProductFun)

function addProducFavorite() {
    favoriteProductFun.updateFavorite(props.id)
}
</script>