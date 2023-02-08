<template>
    <div>
        <slot name="title">

        </slot>
        <div>
            <div class="grid" :class="containerStyle"> 
                <template v-for="(item, i) in sladerData" :key="i">
                    <slot name="item" v-bind="{ item }"> </slot>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    data: object[] | string[] | null, containerStyle?: string}>(), {
        containerStyle: 'gallery__container'
})

const sladerData = computed(() => props.data ? props.data : [...Array(9)])
</script>