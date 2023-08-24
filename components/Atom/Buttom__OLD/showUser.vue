<template>
    <slot name="bt" v-bind="{ showModalUser, userData }">
        <AtomButtomBasic @click="showModalUser" class="bg-rose-600 border-0 py-3 text-white after:content-none" :class="{ 'bg-violet-500': userData }">
           <slot>Start Collecting</slot>
        </AtomButtomBasic>
    </slot>
</template>
<script setup lang="ts">
const { user: _user } = useStore()
const { userData } = _user()

function showModalUser() {
    window.dispatchEvent(new CustomEvent('createUser'))
}
</script>