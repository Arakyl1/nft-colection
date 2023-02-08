<template>
    <div class="h-screen relative overflow-hidden" v-if="route.path === '/'">
        <div class="absolute top-0 left-0 w-screen h-screen bg-gradient-to-r from-[#782C9C] to-[#192063] -z-20"></div>
        <div class="container sm:px-4 xs:px-3 px-2 flex flex-col md:justify-between justify-around h-full relative sm:pt-48 xs:pt-40 pt-32">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 md:scale-100 xs:scale-125 scale-[1.75]">
                <img src="@/assets/img/png/header/bg-1.png" alt="asd" class="opacity-30">
            </div>
            <div class="z-10">
                <div class="text-center">
                    <h1 class="xl:text-[70px] lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-white mb-8 leading-3"
                    >Explore Thousands Of Digital <br/>
                       <span class="relative
                       lg:after:content-[url('@/assets/img/png/header/bg-5.png')]
                       after:absolute after:left-1/2 after:-translate-x-1/2
                       after:translate-y-[5%] xl:after:scale-100 lg:after:scale-90
                       lg:after:translate-y-[-10%] after:content-none
                       ">Art</span>
                       And Collectibles</h1>
                       <p class="text-white sm:text-lg xl:px-40 lg:px-32 md:px-24 sm:px-16 px-8 mb-8"
                       >It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged It was popularised in the 1960s</p>
                        <div class="flex justify-around xs:block">
                            <SharedButtomBase
                            class="text-gray-300 border border-gray-30 hover:bg-rose-600 xs:mx-8 py-3 xs:text-base text-sm">
                                Explore Now
                            </SharedButtomBase>
                            <SharedButtomBase
                            @click="createAccount"
                            class="text-gray-300 border border-gray-30 hover:bg-rose-600 xs:mx-8 py-3 xs:text-base text-sm">
                                Create Account
                            </SharedButtomBase>
                        </div>
                </div>
            </div>
            <div class="mb-12 z-10 xs:block hidden">
                <div class="bg-gradient-to-r to-[#322372] from-[#592889] py-5 sm:px-8 px-4">
                    <ul class="flex justify-between items-center">
                        <li v-for="item in 5" :key="item" class="sm:px-6 px-4">
                            <img :src="`/img/svg/icon/${item}.svg`" :alt="`${item}`"
                            class="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="absolute top-1/2 -left-2/3 -translate-y-1/2 h-[200%] -z-10">
            <img src="@/assets/img/png/header/bg-2.png" alt="asd" class="opacity-50 -rotate-90 h-full ">
        </div>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
function createAccount() {
    window.dispatchEvent(new CustomEvent('createUser'))
}
</script>