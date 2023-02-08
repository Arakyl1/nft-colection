<template>
    <div>
        <div class="h-full shadow-md overflow-hidden flex flex-col">
            <img :src="data.img" alt="image">
            <div class="relative z-0">
                <div class="absolute top-0 left-0 w-[103%] aspect-[3/1]
                        bg-white text-right origin-top-left -rotate-[8deg] px-8 py-1 sm:text-base xs:text-lg text-sm"
                        >{{ transformDate(data.date) }}
                </div>
            </div>
            <div class=" bg-white relative z-10 text-center grow 2xl:p-4 lg:p-3 sm:p-2 xs:p-4 p-2">
                <h4 class="xl:text-lg sm:text-base xs:text-lg font-medium mb-2">{{ data.title }}</h4>
                <p class="xl:text-sm xs:text-base text-sm">{{ data.text }}</p>
            </div>
            <div class="text-center py-4">
                <SharedButtomBase class="border-slate-700 text-slate-700 sm:py-2 sm:px-5 xs:py-3 px-10 py-2 "
                >Read More</SharedButtomBase>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BlogCard } from '@/utils/type';

defineProps<{ data: BlogCard }>()

const transformDate = (date: string) => formatter(temp1('en-US')).format(new Date(date))
</script>