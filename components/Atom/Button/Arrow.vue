<template>
    <AtomButtonStandart class="py-1 px-4 aspect-square rounded-full group hover:bg-rose-600 after:content-none">
        <slot>
            <CreateIcon name="arrow-1_16_16" :att="{ class: 'fill-red-500 group-hover:fill-white'}"/>
        </slot>
    </AtomButtonStandart>
</template>

<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
</script>
