<template>
    <div class="shadow-md transition-all">
        <div class="xs:p-4 p-3">
            <div class="mb-6 relative">
                <div class="absolute top-0 left-0 w-full ">
                    <div class="flex flex-nowrap items-center -mx-1">
                        <div class=" hover:shadow-md transition-all duration-500 w-1/3 hover:w-6/12 mx-1 overflow-hidden aspect-[4/3]"
                            v-for="(item, index) in data.nFTCard" :key="item.id">
                            <img :src="item.img" alt="image" class="object-cover">
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 items-center ">
                    <div class="aspect-[4/3]"></div>
                    <div class="aspect-[4/3]"></div>
                    <div class="aspect-[4/3]"></div>
                </div>
            </div>
            <div class="flex flex-col items-center ">
                <div class="max-w-[100px] lg:w-20 w-16 aspect-square rounded-full">
                    <img :src="data.author.profileImage" :alt="data.author.name">
                </div>
                <h4 class="font-bold 2xl:text-lg sm:text-base text-lg">{{ data.author.name }}</h4>
                <p class="text-center lg:text-sm sm:h-12 text-ellipsis">{{ data.text }}</p>
                <SharedButtomBase class="sm:py-2 sm:px-8 mt-4 xs:py-3 py-2 px-10 sm:text-base xs:text-lg text-base">
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

</script>