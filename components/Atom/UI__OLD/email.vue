<template>
        <input type="email" :class="[{ styleInvalid: !emailValid }]" v-model="email" />
</template>

<script setup lang="ts">

withDefaults(defineProps<{ styleInvalid?: string }>(), { styleInvalid: 'focus-visible:outline-red-500 outline-red-500' })
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
