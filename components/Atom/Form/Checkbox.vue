<template>
    <div>
        <input type="checkbox" v-bind="{ ...attr }" class="peer" ref="checkbox" hidden>
        <div class="relative h-full aspect-square rounded border-2 border-gray-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 
        hover:border-blue-200 group checkbox-box "
        @click.stop="onClick">
            <CreateIcon :name="'checkbox-1_15_15'" class="h-full w-full" :att="{ class: 'checkbox-icon stroke-black-white stroke-2 group-hover-[.checkbox-box]:stroke-blue-200' }"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { InputHTMLAttributes } from 'nuxt/dist/app/compat/capi';
import CreateIcon from "@/content/icons/create";
 defineProps<{ attr?: InputHTMLAttributes }>()

 const checkbox = ref<HTMLInputElement | null>(null)

 function onClick() {
    if (checkbox.value) {
        checkbox.value.click()
    }
}
</script>


<style lang="css">
.peer:checked ~ .checkbox-box .checkbox-icon{
    stroke: white;
}
</style>