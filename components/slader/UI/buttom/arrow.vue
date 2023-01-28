<template>
    <button
     type="button"
     class="bt-base group icon-black shadow hover:bg-rose-500 after:content-none mx-4 py-1 px-4 aspect-square rounded-full">
        <slot><IconArrow/></slot>
     </button>
</template>
<script setup>
import IconArrow from "../icon/arrowTwo.vue";
</script>