<template>
    <slot name="buttom">
        <SharedButtomBase @click="createAccount" class="bg-rose-600 border-0 py-3 text-white after:content-none" :class="{ 'bg-violet-500': userData }">
            Start Collecting
        </SharedButtomBase>
    </slot>
</template>

<script setup lang="ts">
const { userData } = useStoreUser()

function createAccount() {
    window.dispatchEvent(new CustomEvent('createUser'))
}
</script>