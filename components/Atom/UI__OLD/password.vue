<template>
    <input type="password" :class="[!passwordValid ? inValid : valid]" autocomplete="on"
        v-model="password" />
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    valid?: string, inValid?: string
}>(), { valid: 'bg-indigo-300', inValid: 'bg-rose-200' })

const emit = defineEmits<{
    (e: 'password', value: string): void
}>()
const password = ref<string>('')

const passwordValid = computed(() => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g.test(password.value)
})
watch(() => password.value, (newValue) => {
    if (passwordValid.value) {
        emit('password', newValue)
    }
})
</script>
