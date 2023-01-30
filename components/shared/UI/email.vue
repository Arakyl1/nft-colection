<template>
    <input type="email" :class="[{ 'focus-visible:outline-red-500 outline-red-500': !emailValid }]" v-model="email" />
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'input-email', value: string): void
}>()

const email = ref<string>('')
const emailValid = computed(() => {
    return !!email.value.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)
})

watch(() => emailValid.value, (newValue) => {
    if (newValue) {
        emit('input-email', email.value)
    }
})
</script>