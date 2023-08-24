<template>
    <input type="text" required
    :value="modelValue"
    @input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"
    class="input--validation"/>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: any }>()
defineEmits(['update:modelValue'])
</script>