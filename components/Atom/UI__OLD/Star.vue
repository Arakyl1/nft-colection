<template>
    <div class="flex"
    @click="addNumberStar">
        <IconStar v-for="item in 5" :key="item"
        :data-star="item"
        :class="[style.base, quantityStar >= item ? style.active : style.inActive]"/>
    </div>
</template>

<script setup lang="ts">
import { RecordOption } from '@/type/index';

withDefaults(defineProps<{
    quantityStar?: number | undefined
    style?: { base: string, active: string, inActive: string }
}>(), {
    quantityStar: 3,
    style() {
        return {
            base: '',
            active: 'group is-star-rose',
            inActive: 'group is-star-white'
        }
    },
})

const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()

type DatasetKey = 'star'
function addNumberStar({ target }: MouseEvent) {
    interface ModifiedHTMLElement extends HTMLElement {
        dataset: DOMStringMap & RecordOption<DatasetKey, string>
    }
    const elementTarget = target as HTMLElement
    const element = elementTarget.closest('.item__star') as ModifiedHTMLElement
    const number: number = +element.dataset.star
    if (number) {
      emit('numberStar', number)
    }
}
</script>
