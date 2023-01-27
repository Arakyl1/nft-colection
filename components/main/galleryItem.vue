<template>
<div>
    <div class="shadow-lg p-5">
        <template v-if="(typeof data) !== 'number'">
            <div class="relative">
                <img :src="data.img" :alt="data">
                <div class="flex items-center absolute bottom-3 left-1/2 -translate-x-1/2
                py-2 px-4 bg-rose-600 rounded-lg opacity-90">
                <template v-for="(item, i) in infoData" :key="i">
                    <div v-if="'decorCircle' in item" class=" mx-2">
                        <div class="decor-circle"></div>
                        <div class="decor-circle"></div>
                    </div>
                    <div v-else class="text-center mx-2">
                        <p class="text-white text-sm text-center mb-1">{{ item.name  }}</p>
                        <p class="text-white text-sm text-center">{{ item.value  }}</p>
                    </div>
                </template> 
                </div>
            </div>
            <div class="py-4 flex">
                <div class="flex grow">
                    <img src="@/assets/img/svg/icon/box.svg" alt="box" class="mr-2">
                    <p class="text-rose-500 text-sm"
                    >{{ data.quantity ? `${data.quantity} Product Available`: 'Not Available Product' }}</p>
                </div>
                <div>
                    <ButtomAddFavorite :id="data.id"/>
                </div>
            </div>
            <div class="flex mb-6">
                <div class="aspect-square w-10 rounded-full overflow-hidden">
                    <img :src="data.author.profileImage" alt="profileImage">
                </div>
                <div class="grow px-3">
                    <p>{{ data.author.name  }}</p>
                    <p class="text-xs">@{{ data.author.username  }}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs">Current Bid</p>
                    <p>{{  data.price + " " + data.currency}}</p>
                </div>
            </div>
            <div class="text-center">
                <ButtomAddBasket :id="data.id"/>

            </div>
        </template>
        <template v-else>
            <div class="aspect-square flex justify-center items-center">
                <IconLoader/>
            </div>
        </template>
       
    </div>
</div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ data: object | number }>(), { data: 0})

const infoData = [
    { name: 'D', value: '365 '},
    { decorCircle: true },
    { name: 'H', value: '23 '},
    { decorCircle: true },
    { name: 'M', value: '55 '},
    { decorCircle: true },
    { name: 'S', value: '25 '}
]
</script>