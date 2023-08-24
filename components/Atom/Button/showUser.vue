<template>
    <slot name="bt" v-bind="{ showModalUser, _userData }">
        <AtomButtonStandart class="button-1 bg-rose-600 hover:bg-rose-500 py-3 text-white after:content-none"
            :class="{ 'bg-violet-500': _userData }" @click="showModalUser">
            <slot name="icon">Start Collecting</slot>
        </AtomButtonStandart>
    </slot>
</template>
<script setup lang="ts">
import { user as _user } from "@/stores/user";

const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)

function showModalUser() {
    window.dispatchEvent(new CustomEvent('create-user'))
}
</script>