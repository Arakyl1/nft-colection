<template>
    <slot v-bind="{ loginUser }"></slot>
</template>
    
<script setup lang="ts">
const emit = defineEmits<{
    (e: 'login-user', value: boolean): void
}>()

const active = ref(false)

async function loginUser(data: object) {

    const res = await userLogin(data)
    if (res) emit('login-user', active.value = !active.value)
}
</script>