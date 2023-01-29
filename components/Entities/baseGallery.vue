<template>
    <div>
        <slot name="title">

        </slot>
        <div>
            <div class="grid grid-cols-3 gap-8"> 
                <template v-for="item in sladerData" :key="item.id">
                    <slot name="item" v-bind="{ item }"> </slot>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{data: object[] | string[] | null}>()

const sladerData = computed(() => props.data ? props.data : [...Array(9)])
</script>