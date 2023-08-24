<template>
    <div class="flex justify-center">
        <AtomButtonArrow class="-scale-x-100 shadow-md mx-8" @click="prevItem"
            :disabled="sladerValueScroll ? sladerValueScroll.current === 0 : false" />
        <AtomButtonArrow class="shadow-md mx-8" @click="nextItem"
            :disabled="sladerValueScroll ? sladerValueScroll.max === sladerValueScroll.current : false" />
    </div>
</template>

<script setup lang="ts">
import type { sladerValueScroll } from './type';

interface Props {
    prevItem: () => void,
    nextItem: () => void,
    sladerValueScroll?: sladerValueScroll
}
const props = defineProps<Props>()

</script>