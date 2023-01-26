<template>
    <div>
        <div class="flex items-center py-8">
            <div class="flex items-center">
                <a href="/"
                class="text-xl text-white font-medium ml-4">
                    <img src="@/assets/img/png/logo.png" alt="logo">
                    NFT Gallery
                </a>
            </div>
            <div class="grow"></div>
            <menu >
                <ul class="flex">
                    <li v-for="item in link" :key="item" class="px-4">
                        <a :href="`${item}`"
                        class="text-lg text-white hover:text-rose-600 hover:underline decoration-rose-600 underline-offset-8 transition-all"
                        >{{ item }}</a>
                    </li>
                </ul>
            </menu>
            <div class="grow"></div>
            <div >
                <ButtomUser/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const link = ['Home', 'Activity', 'Category', 'Blogs', 'Browser']
</script>