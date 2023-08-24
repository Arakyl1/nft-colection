<template>
    <div class="">
        <div class="flex w-full items-center">
            <input class="w-[45%]" type="number"
                :name="section.from.name"
                :placeholder="section.from.placeholder"
                :step="section.from.step"
                min="0.01"
                :max="value.to <= 0 ? section.from.max : value.to"
                :class="[style.input, 'input--validation']"
                @input="(e) => (value.from = (e.target as HTMLInputElement).valueAsNumber)" />
            <p class="grow text-center">:</p>
            <input class="w-[45%] p-2" type="number"
                :placeholder="section.to.placeholder"
                :name="section.to.name"
                :step="section.to.step"
                :min="value.from ? value.from : section.to.min"
                :max="section.to.max"
                :class="[style.input, 'input--validation']"
                @input="(e) => (value.to = (e.target as HTMLInputElement).valueAsNumber)" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    style: { input: string },
    section: {
        title: string
        from: { name: string, min: number, max: number, placeholder: string, step: number }
        to: { name: string, min: number, max: number, placeholder: string, step: number }
    }
}>()
const value = ref<{ from: number, to: number }>({ from: 0, to: 0 })
</script>