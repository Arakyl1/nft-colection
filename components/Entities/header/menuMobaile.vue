<template>
    <div ref="menuMobaile"
    class="fixed top-0 left-0 h-screen w-[80vw] transition-all"
    :class="[stage ? 'left-0' : '-left-full']">
            <div class="menu__animation h-full">
                <div class="p-8">
                    <div class="mb-8">
                        <NuxtLink to="/" class="text-xl text-white font-medium flex items-center">
                            <img src="@/assets/img/png/logo.png" alt="logo" class="w-12">
                            <p class="ml-2 "> NFT Gallery</p>
                        </NuxtLink>
                    </div>
                    <div>
                        <ul>
                            <li v-for="item in link" :key="item.name" class="py-2">
                                <NuxtLink v-if="item.nuxtLink" :to="item.link" class="header__link text-2xl">{{
                                    item.name
                                }}
                                </NuxtLink>
                                <p v-else class="header__link text-2xl">{{ item.name }}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
const { stage, updateStage } = showContent()
const menuMobaile = ref<HTMLElement | null>(null)
const elemToucheParam = toucheElemPosition(menuMobaile)

const link = [
    { name: 'Home', link: '/', nuxtLink: true },
    { name: 'Activity', link: '/activity', nuxtLink: false },
    { name: 'Category', link: '/category', nuxtLink: false },
    { name: 'Blogs', link: '/blogs', nuxtLink: true },
    { name: 'Add', link: '/add', nuxtLink: true }
]

watch(() => elemToucheParam?.vector, (newVector) => {
    if (newVector && newVector === 3) updateStage(event, false)
})

onBeforeMount(() => {
    window.addEventListener('showMenu', updateStage)
})
</script>

<style lang="css">
.menu__animation{
    background: linear-gradient(-45deg, #192063, #492680, #782C9C, #492680, #192063);
    background-size: 400%;
    animation: gradient 10s ease infinite;
}
@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>