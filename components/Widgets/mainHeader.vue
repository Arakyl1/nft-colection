<template>
    <div class="h-screen relative overflow-hidden" v-if="route.path === '/'">
        <div class="absolute top-0 left-0 w-screen h-screen bg-gradient-to-r from-[#782C9C] to-[#192063] -z-20"></div>
        <div class="max-w-7xl mx-auto px-4 flex flex-col justify-between h-full relative pt-48">
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
                <img src="@/assets/img/png/header/bg-1.png" alt="asd" class="opacity-30">
            </div>
            <div class="z-10">
                <div class="text-center">
                    <h1 class="text-[70px] font-bold text-white mb-8 leading-3">Explore Thousands Of Digital <br/>
                       <span class="relative
                       after:content-[url('@/assets/img/png/header/bg-5.png')]
                       after:absolute
                       after:left-1/2
                       after:-translate-x-1/2
                       after:translate-y-[5%]
                       ">Art</span>
                       And Collectibles</h1>
                       <p class="text-white text-lg px-40 mb-8">It has survived not only five centuries, but also the leap into electronic typesetting,
                        remaining essentially unchanged It was popularised in the 1960s</p>
                        <div>
                            <SharedButtomBase
                            class="text-gray-300 border border-gray-30 hover:bg-rose-600 mx-8 py-3">
                                Explore Now
                            </SharedButtomBase>
                            <SharedButtomBase
                            @click="createAccount"
                            class="text-gray-300 border border-gray-30 hover:bg-rose-600 mx-8 py-3">
                                Create Account
                            </SharedButtomBase>
                        </div>
                </div>
            </div>
            <div class="mb-12 z-10">
                <div class="bg-gradient-to-r to-[#322372] from-[#592889] py-5 px-8">
                    <ul class="flex justify-between items-center">
                        <li v-for="item in 5" :key="item" class="">
                            <img :src="`/img/svg/icon/${item}.svg`" :alt="`${item}`">
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