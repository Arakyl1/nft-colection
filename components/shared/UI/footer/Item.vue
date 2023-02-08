<template>
    <div>
        <div class="decor-line"></div>
        <div class="py-5 sm:py-4">
            <div class="flex items-center">
                <h3 class="grow text-white text-xl sm:text-lg">{{ title }}</h3>
                <UIIconAdd class="group is-icon-white h-5 w-5" @click="() => active = !active" />
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

withDefaults(defineProps<{ data: object | object[], title?: string }>(), { title: 'Информация' })
const active = ref<boolean>(false)
</script>