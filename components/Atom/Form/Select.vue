<template>
    <select class="p-2 rounded-md text-gray-300 w-full focus-visible:outline-none"
        :value="modelValue"
        @change="(e) => $emit('update:modelValue', (e.target as HTMLSelectElement).value)">
        <option class="text-gray-300"></option>
        <template v-for="item in data" :key="item.id">
            <slot>
                <option class="text-gray-300" :value="item.id">
                    {{ item.value }}
                </option>
            </slot>
        </template>
    </select>
</template>
<script setup lang="ts" generic="T extends { name: string, id: number, value: string }">

defineProps<{ data: T[], modelValue: string | number }>()
defineEmits<{
    (event: "update:modelValue", args: string| number): void
}>()
</script>