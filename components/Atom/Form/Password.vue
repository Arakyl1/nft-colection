<template>
    <input type="password" required autocomplete="on"
    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
    minlength="8" maxlength="25"
    class="input--validation"
    :value="modelValue"
    @input="e => $emit('update:modelValue', (e.target as HTMLInputElement).value)"/>
</template>

<script setup lang="ts">
defineProps<{ modelValue?: any }>()
defineEmits(['update:modelValue'])
</script>6