<template>
    <slot v-bind="{ showModalFavorite, favoriteData }">
        <AtomButtonStandart @click="showModalFavorite" class="p-0 px-1 ">
            <CreateIcon :name="'like-2_22_22'" :att="{ class: 'stroke-2 ' + favoriteData.size ? 'fill-rose-600 stroke-rose-600' : 'fill-none stroke-slate-900' }" class="w-6"/>
        </AtomButtonStandart>
    </slot>
</template>

<script setup lang="ts">
import { favorite as _favorite } from "@/stores/favorite";
import CreateIcon from "@/content/icons/create";

const storeFavorite = _favorite()
const { data: favoriteData } = storeToRefs(storeFavorite)

function showModalFavorite() {
    window.dispatchEvent(new CustomEvent(GET_CUSTOM_EVENT_NAME('show-modal-favorite')))
}
</script>