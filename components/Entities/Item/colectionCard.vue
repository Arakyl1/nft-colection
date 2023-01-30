<template>
    <div class="shadow-md transition-all">
        <div class="p-4 ">
            <div class="grid grid-cols-3 gap-2 items-center mb-2">
                <div v-for="(item, index) in data.nFTCard"
                class="hover:scale-110 hover:shadow-md transition-all aspect-[3/2] relative overflow-hidden">
                    <img :src="item.img" alt="image" class=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                </div> 
            </div>
            <div class="flex flex-col items-center ">
                <div class="max-w-[100px] aspect-square rounded-full">
                    <img :src="data.author.profileImage" :alt="data.author.name">
                </div>
                <h4 class="text-lg font-bold">{{  data.author.name }}</h4>
                <p class="text-center h-12 text-ellipsis">{{  data.text }}</p>
                <SharedButtomBase class="py-2 px-6 mt-4">
                    +FLLOW
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
</script>