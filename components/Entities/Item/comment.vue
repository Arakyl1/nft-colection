<template>
    <div class="flex h-full">
        <div class="w-6/12 relative z-20">
            <div class="border-2 border-rose-600 border-r-0 h-full bg-white">
                <div class="p-6 pr-0">
                    <div class="flex items-center">
                        <div class="w-20 aspect-square relative rounded-full border-rose-600 border overflow-hidden">
                            <img :src="data.author.profileImage" alt="user">
                        </div>
                        <div class="pl-4">
                            <p class="text-xl font-medium mb-2">{{
                                data.author.name ? data.author.name :
                                data.author.username
                            }}</p>
                            <SharedOtherStar :quantity-star="data.ranting" />
                        </div>
                    </div>
                    <div class="py-4">
                        <p class="text-xl">{{ data.text }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-2/12 relative z-10">
            <div class="skew-x-[-24deg] origin-top-left h-full border-white border-r-[10px] bg-white">
                <div class="h-full border-2 border-rose-600 border-l-transparent -ml-1"></div>
            </div>

        </div>
        <div class="w-4/12 relative z-0 ">
            <div class="relative h-full -ml-36 overflow-hidden">
                <img :src="data.card.img" alt="" class="absolute top-1/2 right-1/2 min-h-[103%] min-w-[103%] translate-x-1/2 -translate-y-1/2">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CommentUser } from "@/utils/type";
defineProps<{ data: CommentUser }>()
</script> 