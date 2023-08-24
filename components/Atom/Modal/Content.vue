<template>
    <div class="h-full bg-gray-100 p-8 overflow-hidden rounded-md sm:p-4">
        <div class="flex w-full">
            <slot name="title">
                <h2 class="text-2xl grow text-blue-700 sm:text-xl">{{ title }}</h2>
            </slot>
            <CreateIcon name="close_20_20" :att="{ class: 'fill-black-100' }"
                class="cursor-pointer float-right"
                @click="clickFun(false)" />
        </div>
        <div v-if="decorLine" class="decor-line mt-5 mb-4 sm:mt-3"></div>
        <div class="h-5/6 overflow-y-scroll ot2__container">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import CreateIcon from "@/content/icons/create";

interface Props {
    title?: string,
    textDefault?: string,
    decorLine?: boolean,
    clickFun: (...arg: any) => any
}

const props = withDefaults(defineProps<Props>(), {
    title: 'Categor',
    textDefault: 'Text',
    decorLine: true,
})
</script>

<style lang="css">
.ot2__container {
    scrollbar-width: none;
}

.ot2__container::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>