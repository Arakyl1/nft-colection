<template>
    <div v-show="alertActive"
    class="fixed top-5 right-5 z-50 ">
        <div class="px-4 py-2 w-min h-min rounded-full bg-indigo-600">
            <p class="text-rose-100 sm:text-sm whitespace-nowrap">{{ content }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { content, alertActive } = useAlert()

</script>