<template>
    <div class="flex"
    @click="addNumberStar">
        <UIIconStar v-for="item in 5" :key="item"
        :data-star="item"
        :class="[ quantityStar >= item ? 'group is-star-rose' : 'group is-star-white']"/>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    quantityStar?: number | string | undefined 
}>(), { quantityStar: 0})
const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()

function addNumberStar(event: Event) {
    const numderStar = +event.target.closest('.item__star')?.dataset.star;
    if (numderStar) {
        emit('numberStar', numderStar)
    }
}
</script>