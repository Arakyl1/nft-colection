<template>
<div class=" top-0 left-0 w-full transition-all"
:class="[[route.path === '/' ? 'fixed py-8' : 'block bg-gradient-to-r from-[#782C9C] to-[#192063] py-4'], []]">
    <div class="max-w-7xl mx-auto px-4 flex flex-col justify-between h-full relative">
        <div class="flex items-center">
            <div>
                <NuxtLink to="/" class="text-xl text-white font-medium ml-4 flex items-center">
                    <img src="@/assets/img/png/logo.png" alt="logo">
                    <p> NFT Gallery</p>
                   
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
                <TheUser/>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang="ts">
const route = useRoute()
const link = [
    { name: 'Home', link: '/', nuxtLink: true },
    { name: 'Activity', link: '/activity', nuxtLink: false },
    { name: 'Category', link: '/category', nuxtLink: false },
    { name: 'Blogs', link: '/blogs', nuxtLink: true },
    { name: 'Add', link: '/add', nuxtLink: true }
    ]

</script>