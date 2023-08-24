<template>
    <div>
        <div class="decor-line"></div>
        <div class="py-5 sm:py-4">
            <div class="flex items-center">
                <h3 class="grow text-white text-xl sm:text-lg">{{ title }}</h3>
                <AtomButtonStandart @click="() => active = !active" class="p-0 after:content-none">
                    <CreateIcon name="add-plus_16_16" :att="{ class: 'fill-white' }"  />
                    </AtomButtonStandart>
            </div>
            <ul v-show="active" class="mt-4">
                <li v-for="item in data" class="mb-1.5 text-lg sm:text-base">
                    <NuxtLink :to="item.link" class="text-gray-300"> {{ item.name }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
import CreateIcon from "@/content/icons/create";
interface Props {
    data: { link: string, name: string | number }[],
    title?: string
}
withDefaults(defineProps<Props>(), { title: 'Информация' })
const active = ref<boolean>(false)
</script>