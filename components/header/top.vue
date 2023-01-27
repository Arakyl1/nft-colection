<template>
    <div>
        <div class="flex items-center py-8">
            <div class="flex items-center">
                <NuxtLink to="/" class="text-xl text-white font-medium ml-4">
                    <img src="@/assets/img/png/logo.png" alt="logo">
                    NFT Gallery
                </NuxtLink>
            </div>
            <div class="grow"></div>
            <menu >
                <ul class="flex">
                    <li v-for="item in link" :key="item.name" class="px-4">
                        <NuxtLink v-if="item.nuxtLink" :to="item.link" class="header__link "
                            >{{ item.name }}</NuxtLink>
                        <p v-else class="header__link ">{{ item.name }}</p>
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
const link = [
    { name: 'Home', link: '/', nuxtLink: true },
    { name: 'Activity', link: '/activity', nuxtLink: false },
    { name: 'Category', link: '/category', nuxtLink: false },
    { name: 'Blogs', link: '/blogs', nuxtLink: true },
    { name: 'Add', link: '/add', nuxtLink: true }
    ]

</script>