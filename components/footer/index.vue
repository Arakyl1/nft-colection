<template>
<footer>
    <div class="bg-gradient-to-b from-[#1E1E46] to-[#1C0088] relative overflow-hidden">
        <div class="absolute top-1/2 -left-1/3 -translate-y-1/2 h-[150%] -rotate-90">
            <img src="@/assets/img/png/header/bg-2.png" alt="" class="h-full">
        </div>
        <div class="absolute bottom-5 left-4 ">
            <img src="@/assets/img/png/header/bg-6.png" alt="">
        </div>
        <div class="absolute bottom-5 right-4 ">
            <img src="@/assets/img/png/header/bg-6.png" alt="">
        </div>
        <div class="max-w-7xl mx-auto px-4">
            <div class="py-20">

                <div class="flex">
                    <div class="w-1/3 pr-12">
                        <p class="text-xl text-white font-medium mb-8">
                            <img src="@/assets/img/svg/logo.svg" alt="logo" class="inline"
                            >CASA <br/> Marketplace
                        </p>
                        <p class="text-gray-300 mb-8">which is the same as saying through
                            shrinking from toil and pain. These cases
                            are perfectly simple and easy to distinguish.
                        </p>
                        <ul>
                            <li v-for="(item, i) in contact" :key="i" 
                            class="flex mb-8 last:mb-0">
                                <img :src="`./img/svg/icon/${item.img}.svg`" :alt="item.img">
                                <p class="text-gray-300 px-6">{{ item.text  }}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="flex justify-around grow">
                        <div v-for="item in link" :key="item.title"
                        class="">
                            <h3 class="text-white font-medium text-xl mb-6">{{  item.title }}</h3>
                            <ul>
                                <li v-for="elem in item.content" :key="elem.name"
                                class="py-3">
                                    <a href="" class="text-gray-300"
                                    >{{  elem.name }}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 class="text-white font-medium text-xl mb-6">Newsletter</h3>
                        <ul class="flex flex-wrap max-w-[200px] -m-2 mb-8">
                            <li v-for="item in imgName" :key="item" class="w-9 bg-white aspect-square rounded-full m-2">
                                <div class=" flex justify-center items-center h-full">
                                    <img :src="`./img/svg/icon/${item}.svg`" :alt="item">
                                </div>
                            </li>
                        </ul>
                        <form>
                            <div class="flex rounded-lg overflow-hidden">
                                <input type="text"
                                placeholder="Enter Your Email"
                                class="rounded-l-lg px-4 border-2 border-r-0 border-gray-300 bg-transparent focus-visible:outline-0 focus-visible:border-rose-300 text-white">
                                <ButtomStandart class="py-2 bg-rose-600 text-white  rounded-none rounded-r-lg">
                                    Subcribe
                                </ButtomStandart>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="py-8">
                <p class="text-lg text-white text-center">© Copyright 2022. Powered by Ordainit</p>
            </div>
        </div>
    </div>
</footer>
</template>
<script setup lang="ts">
const contact = [
    { text: '+7 (495) 2222-0000-32', img: 'phone'},
    { text: 'Hello.me@nft.com', img: 'mail'},
    { text: '00000 Collins Street West Victoria 66666 Australia', img: 'marker'}
]

const link = [
    { title: 'Explore', content: [
        { name: 'My Account', link: '', fun: ''},
        { name: 'Create Now', link: '', fun: ''},
        { name: 'List a Item', link: '', fun: ''},
        { name: 'Privacy Polocy', link: '', fun: ''},
        { name: 'FAQs', link: '', fun: ''},
    ]},
    { title: 'Marketplece', content: [
        { name: 'Art', link: '', fun: ''},
        { name: 'Photo', link: '', fun: ''},
        { name: 'Create a Store', link: '', fun: ''},
        { name: 'Start Selling', link: '', fun: ''},
    ]}
]
const imgName = ['fac', 'inst', 'wtapp', 'twi', 'youTu']
</script>