<template>
    <div class="header__container" :class="[
        [route.path === '/' ?
    (valueScrollTop < 50 ? 'fixed sm:py-8 py-6' : 'fixed bg-gradient-to-r from-[#782C9C] to-[#192063] py-3 ') :
    'block bg-gradient-to-r from-[#782C9C] to-[#192063] py-3']]">
        <div class="container sm:px-4 xs:px-3 px-2 flex flex-col justify-between h-full relative ">
            <div class="flex items-center justify-between">

                <AtomButtonStandart class="border-0 p-0 sm:hidden after:content-none" @click="showMenu">
                    <IconMenu class="group is-icon-white w-12 h-12" />
                </AtomButtonStandart>
                <div>
                    <NuxtLink to="/" class="text-xl text-white font-medium sm:ml-4 flex items-center">
                        <img src="@/assets/img/png/logo.png" alt="logo" class="sm:w-12 w-10">
                        <p class="ml-2 lg:block hidden"> NFT Gallery</p>

                    </NuxtLink>
                </div>
                <div class="grow sm:block hidden"></div>
                <menu class="sm:block hidden">
                    <ul class="flex">
                        <li v-for="item in ROUTE_LINK" :key="item.name" class="px-4">
                            <NuxtLink v-if="item.nuxtLink" :to="item.link" class="header__link ">{{ item.name }}
                            </NuxtLink>
                            <p v-else class="header__link ">{{ item.name }}</p>
                        </li>
                    </ul>
                </menu>
                <div class="grow sm:block hidden"></div>
                <div class="">
                    <AtomButtonShowUser>
                        <template #buttom="{ showModalUser, userData }" v-if="isMobileOrTablet">
                            <AtomButtonStandart @click="showModalUser"
                                class="button-1 bg-rose-600 border-0 md:py-3 text-white after:content-none aspect-square p-3 rounded-xl"
                                :class="{ 'bg-violet-500': userData }">
                                <IconUser class="group is-icon-white w-5 h-5" />
                            </AtomButtonStandart>
                        </template>
                    </AtomButtonShowUser>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_LINK } from "@/utils/data";
const route = useRoute()
const valueScrollTop = ref<number>(0)
const { isMobileOrTablet } = useDevice()


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