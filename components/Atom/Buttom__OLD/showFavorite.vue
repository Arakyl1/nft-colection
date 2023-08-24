<template>
    <slot v-bind="{ showModalFavorite, favorite }">
        <AtomButtonStandart @click="showModalFavorite" class="group p-0 px-1"
            :class="[favorite.size ? 'icon-red' : 'icon-black']">
            <IconLike class="w-6" />
        </AtomButtonStandart>
    </slot>
</template>
<script setup lang="ts">
const { favorite: _favoriteStore } = useStore()
const { favorite } = _favoriteStore()

function showModalFavorite() {
    window.dispatchEvent(new CustomEvent('showModalFavoriteProduct'))
}
</script>