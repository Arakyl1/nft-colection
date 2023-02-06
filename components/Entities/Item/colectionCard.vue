<template>
    <div class="shadow-md transition-all">
        <div class="p-4 ">
            <div class="mb-6 relative">
                <div class="flex flex-nowrap -mx-1 items-center absolute top-0 left-00 w-full">
                    <div class="relative aspect-[3/2] hover:shadow-md transition-all duration-500 overflow-hidden mx-1 w-1/3
                    hover:w-6/12"
                    v-for="(item, index) in data.nFTCard" :key="item.id">
                        <img :src="item.img" alt="image" class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 items-center ">
                    <div class="aspect-[3/2]"></div>
                    <div class="aspect-[3/2]"></div>
                    <div class="aspect-[3/2]"></div>
                </div>
            </div>
            <div class="flex flex-col items-center ">
                <div class="max-w-[100px] aspect-square rounded-full">
                    <img :src="data.author.profileImage" :alt="data.author.name">
                </div>
                <h4 class="text-lg font-bold">{{  data.author.name }}</h4>
                <p class="text-center h-12 text-ellipsis">{{  data.text }}</p>
                <SharedButtomBase class="py-2 px-8 mt-4">
                    + FLLOW
                </SharedButtomBase>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { Colection, User } from '~~/utils/type';

interface ColectionUpdate extends Colection {
    nFTCard: { id: number, img: string }[],
    author: User
}
defineProps<{ data: ColectionUpdate }>()

const indexCardActive = ref<number | null>(null)

function updateIndexCard(index:number) {
    indexCardActive.value = index 
}
</script>