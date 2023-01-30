<template>
    <slot v-bind="{ createUser }"></slot>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'reset-data', value: boolean):void
}>()

const { createAlert } = useAlert()
const reset = ref<boolean>(false)

async function createUser(data: object) {
    if (!data) return
    const res = await userRegister(JSON.stringify(data))
    if (res) {
        emit('reset-data', reset.value = !reset.value)
        createAlert('Пользователь зарегистрирован')
    }
}
</script>
