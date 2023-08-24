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
interface Props {
    data: { [k: string]: string }[] | string[] | null,
    containerStyle?: string
}
const props = withDefaults(defineProps<Props>(), {
    data: null,
    containerStyle: 'gallery__container'
})

const sladerData = computed(() => props.data ? props.data : [...Array(9)])
</script>