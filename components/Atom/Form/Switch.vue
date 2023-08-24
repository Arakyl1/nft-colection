<template>
    <div class="inline-block aspect-[2.6/1] h-6 text-2xl " @click.stop="onClick">
        <input type="checkbox" hidden ref="checkbox" class="peer" :name="inputName.toString()" :value="inputValue">
        <div class="rounded-full transition-all p-[0.15em] w-ful aspect-[2.6/1]
            bg-gray-400 peer-checked:bg-blue-500">
            <div class="flex aspect-[2.6/1] relative">
                <div class="h-full aspect-square rounded-full shadow shadow-gray-300 inline-block
                    bg-white absolute top-0 transition-all left-0 translate-x-0 active-curcle"
                    @click.stop></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ inputName: string | number, inputValue: string | number }>()
const checkbox = ref<HTMLInputElement | null>(null)

function onClick() {
    if (checkbox.value) {
        checkbox.value.click()
    }
}
</script>

<style lang="css">
.peer:checked ~ .peer-checked\:bg-blue-500 .active-curcle{
    transform: translateX(159%);
}
</style>
