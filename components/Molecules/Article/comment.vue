<template>
    <div class="flex h-full" v-if="data">
        <div class="lg:w-6/12 sm:w-7/12 w-full relative z-0">
            <div class="xs:border-2 border-0 border-rose-600 sm:border-r-0 h-full bg-white">
                <div class="lg:p-6 sm:p-4 p-2">
                    <div class="flex items-center">
                        <div class="lg:w-20 md:w-16 p-1 w-12 aspect-square relative rounded-full border-rose-600 border overflow-hidden">
                            <img :src="data.author.profileImage" alt="user">
                        </div>
                        <div class="lg:pl-4 pl-2">
                            <p class="lg:text-xl font-medium mb-2 md:text-lg">{{
                                data.author.name ? data.author.name :
                                data.author.usernames
                            }}</p>
                            <AtomFormRating :quantity-star="data.rating" class="w-36 justify-between"/>
                        </div>
                    </div>
                    <div class="lg:py-4 py-2 -z-10">
                        <p class="xl:text-xl lg:text-lg xs:text-base text-sm line-clamp-3 lg:line-clamp-4"
                        >{{ data.text  }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="lg:w-2/12 sm:w-1/12 relative -z-10 sm:block hidden">
            <div class="lg:skew-x-[-24deg] md:skew-x-[-10deg] sm:skew-x-[-6deg] origin-top-left h-full border-white border-r-[10px] bg-white">
                <div class="h-full border-2 border-rose-600 border-l-transparent -ml-1"></div>
            </div>

        </div>
        <div class="w-4/12 relative -z-20 sm:block hidden">
            <div class="relative h-full lg:-ml-36 -ml-12 overflow-hidden">
                <img :src="data.card.img" alt="" class="absolute top-1/2 right-1/2 min-h-[103%] min-w-[103%] translate-x-1/2 -translate-y-1/2 object-cover">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CommentUser } from "@/type/index";

defineProps<{ data: CommentUser }>()
</script> 