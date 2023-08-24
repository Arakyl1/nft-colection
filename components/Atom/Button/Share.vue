<template>
    <AtomButtonStandart>
        <slot>
            <CreateIcon name="share_24_24" :att="{ class: 'fill-white' }" class=""/>
        </slot>
    </AtomButtonStandart>
</template>

<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
</script>