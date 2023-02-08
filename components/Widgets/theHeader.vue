<template>
    <div class="header__container" :class="[
        [route.path === '/' ?
    (valueScrollTop < 50 ? 'fixed sm:py-8 py-6' : 'fixed bg-gradient-to-r from-[#782C9C] to-[#192063] py-3 ') :
    'block bg-gradient-to-r from-[#782C9C] to-[#192063] py-3']]">
        <div class="container sm:px-4 xs:px-3 px-2 flex flex-col justify-between h-full relative ">
            <div class="flex items-center justify-between">

                <UIButtomStan class="border-0 p-0 sm:hidden after:content-none" @click="showMenu">
                    <UIIconMenu class="group is-icon-white w-12 h-12" />
                </UIButtomStan>
                <div>
                    <NuxtLink to="/" class="text-xl text-white font-medium sm:ml-4 flex items-center">
                        <img src="@/assets/img/png/logo.png" alt="logo" class="sm:w-12 w-10">
                        <p class="ml-2 lg:block hidden"> NFT Gallery</p>

                    </NuxtLink>
                </div>
                <div class="grow sm:block hidden"></div>
                <menu class="sm:block hidden">
                    <ul class="flex">
                        <li v-for="item in link" :key="item.name" class="px-4">
                            <NuxtLink v-if="item.nuxtLink" :to="item.link" class="header__link ">{{ item.name }}
                            </NuxtLink>
                            <p v-else class="header__link ">{{ item.name }}</p>
                        </li>
                    </ul>
                </menu>
                <div class="grow sm:block hidden"></div>
                <div class="">
                    <EntitiesButtomUser>
                        <template #buttom="{ createAccount, userData }" v-if="isMobileOrTablet">
                            <SharedButtomBase @click="createAccount"
                                class="bg-rose-600 border-0 md:py-3 text-white after:content-none aspect-square p-3 rounded-xl"
                                :class="{ 'bg-violet-500': userData }">
                                <UIIconUser class="group is-icon-white w-5 h-5" />
                            </SharedButtomBase>
                        </template>
                    </EntitiesButtomUser>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const valueScrollTop = ref<number>(0)
const { isMobileOrTablet } = useDevice()

const link = [
    { name: 'Home', link: '/', nuxtLink: true },
    { name: 'Activity', link: '/activity', nuxtLink: false },
    { name: 'Category', link: '/category', nuxtLink: false },
    { name: 'Blogs', link: '/blogs', nuxtLink: true },
    { name: 'Add', link: '/add', nuxtLink: true }
]

onBeforeMount(() => {
    window.addEventListener('scroll', updateScrollTop)
})
onBeforeUnmount(() => {
    window.removeEventListener('scroll', updateScrollTop)
})

function updateScrollTop() {
    valueScrollTop.value = window.scrollY
}

function showMenu() {
    window.dispatchEvent(new CustomEvent('showMenu'))
}

</script>