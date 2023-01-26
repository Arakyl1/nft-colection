<template>
<div class="text-center">
    <p class="text-rose-600 font-medium"><slot name="top"></slot></p>
    <h2 class="text-[40px] font-bold text-slate-800 py-6 group-[.title-color-purple]:text-purple-600">
        <slot name="title">Title</slot>
        <span class="text-rose-500 underline decoration-rose-500 underline-offset-[12px]">
            <slot name="title-span"></slot>
        </span>
    </h2>
    <p class="text-slate-800 text-lg px-40"><slot name="bottom"></slot></p>
</div>
</template>
<script setup lang="ts">
defineProps()
</script>