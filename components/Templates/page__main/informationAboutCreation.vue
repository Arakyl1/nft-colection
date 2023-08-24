<template>
    <section>
        <div>
            <slot>
                <h2 class="font-bold 2xl:mb-12 xl:mb-8 mb-4 2xl:text-[40px] xl:text-4xl sm:text-3xl text-2xl">Creat And Sell Your NFTs</h2>
            </slot>
            <div>
                <div class="flex lg:flex-nowrap flex-wrap 2xl:-mx-6 lg:-mx-2">
                    <div class="grid sm:grid-cols-2 sm:gap-6 2xl:mx-6 mx-2 xl:w-1/2 lg:w-2/3 w-full mb-8 lg:mb-0">
                        <div v-for="(item, index) in listItem" :key="index" class="lg:block flex flex-nowrap items-center sm:mb-0 mb-4">
                            <div class="lg:mb-2">
                                <div :style="{ backgroundColor: '#' + item.bg }" class="
                                xl:w-20 lg:w-16 md:w-20 w-12 aspect-square rounded-xl flex items-center justify-center  p-2">

                                    <img :src="`./img/svg/icon/${item.img}`" alt="">
                                </div>
                            </div>
                            <div class="xl:pl-0 pl-4">
                                <h3 class="xl:text-xl font-bold mb-1 md:mb-2 lg:text-lg">{{ item.title }}</h3>
                                <p class="text-sm">{{ item.text }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="xl:w-1/2 lg:w-1/3 w-full 2xl:mx-6 lg:mx-2 lg:pl-6 lg:block flex justify-center">
                        <img src="@/assets/img/png/main/2.png" alt="">
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
<script setup lang="ts">

const listItem: { title: string, text: string, img: string, bg: string }[] = [
    { title: 'Setup Your Wallet', text: 'When our power of choice is untram and when nothing prevents our', img: 'wallet.svg', bg: 'FFAEC7' },
    { title: 'For Sale Listing', text: 'When our power of choice is untram and when nothing prevents our', img: 'list.svg', bg: '7B5959' },
    { title: 'Creat Your Collection', text: 'When our power of choice is untram and when nothing prevents our', img: 'group.svg', bg: 'BDEFFF' },
    { title: 'Add Your NFT', text: 'When our power of choice is untram and when nothing prevents our', img: 'nft.svg', bg: 'AEFFC5' },
]
</script>