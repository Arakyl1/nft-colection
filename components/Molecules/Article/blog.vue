<template>
    <div>
        <div class="h-full shadow-md overflow-hidden flex flex-col">
            <div class="mx-2 aspect-square bg-rose-100">
                <img :src="data.image[0].link" alt="image" v-if="data.image.length" class="w-full object-cover aspect-square">
            </div>
            <div class="relative z-0">
                <div class="absolute top-0 left-0 w-[103%] aspect-[3/1]
                        bg-white text-right origin-top-left -rotate-[8deg] px-8 py-1 sm:text-base xs:text-lg text-sm"
                        >{{ data.createAt ? transformDate(data.createAt as unknown as string) : null }}
                </div>
            </div>
            <div class=" bg-white relative z-10 text-center grow 2xl:p-4 lg:p-3 sm:p-2 xs:p-4 p-2">
                <h4 class="xl:text-lg sm:text-base xs:text-lg font-medium mb-2 line-clamp-1">{{ data.title }}</h4>
                <p class="xl:text-sm xs:text-base text-sm line-clamp-3">{{ data.text }}</p>
            </div>
            <div class="text-center py-4">
                <AtomButtonStandart class="button-2 border-slate-700 text-slate-700 sm:py-2 sm:px-5 xs:py-3 px-10 py-2 "
                >Read More</AtomButtonStandart>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BlogCard } from '@prisma/client';

defineProps<{ data: BlogCard }>()

const transformDate = (date: string) => formatter(temp1('en-US')).format(new Date(date))
</script>