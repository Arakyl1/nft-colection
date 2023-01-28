<template>
    <div>
        <div class="h-full shadow-md overflow-hidden flex flex-col">
            <img :src="data.img" :alt="data.id">
            <div class="relative z-0">
                <div class="absolute top-0 left-0 w-[103%] aspect-[3/1]
                        bg-white text-right origin-top-left -rotate-[8deg] px-8 py-1">{{ transformDate(data.date) }}
                </div>
            </div>
            <div class=" bg-white relative z-10 text-center p-4 grow">

                <h4 class="text-lg font-medium mb-2">{{ data.title }}</h4>
                <p>{{ data.text }}</p>
            </div>
            <div class="text-center py-4">
                <ButtomReadMore />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ButtomReadMore from "./UI/buttom/readMore.vue";
defineProps<{ data: object }>()
const transformDate = (date: string) => formatter(temp1('en-US')).format(new Date(date))
</script>