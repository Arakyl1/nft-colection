<template>
    <section>
        <div>
            <slot>
                <h2 class="text-4xl font-bold mb-12">Creat And Sell Your NFTs</h2>
            </slot>
            <div>
                <div class="grid grid-cols-2 gap-x-12">
                    <div class="grid grid-cols-2 gap-x-6">
                        <div v-for="(item, index) in listItem" :key="index">
                            <div class="w-20 aspect-square rounded-xl flex items-center justify-center mb-2">
                                <img :src="`./img/svg/icon/${item.img}`" alt="">

                            </div>
                            <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
                            <p class="text-sm">{{ item.text }}</p>
                        </div>
                    </div>
                    <div>
                        <img src="@/assets/img/png/main/2.png" alt="">
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
<script setup lang="ts">

const listItem: { title: string, text: string, img: string }[] = [
    { title: 'Setup Your Wallet', text: 'When our power of choice is untram and when nothing prevents our', img: 'wallet.svg'},
    { title: 'For Sale Listing', text: 'When our power of choice is untram and when nothing prevents our', img: 'list.svg' },
    { title: 'Creat Your Collection', text: 'When our power of choice is untram and when nothing prevents our', img: 'group.svg'  },
    { title: 'Add Your NFT', text: 'When our power of choice is untram and when nothing prevents our', img: 'nft.svg' },
]
</script>