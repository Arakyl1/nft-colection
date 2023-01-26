<template>
    <div>
        <OtherElseSectionHeader class="m-12">
            <template #title>
                NFT art, Domain name, Stachu, Collection Gallery
            </template>
            <template #bottom>
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged
            </template>
        </OtherElseSectionHeader>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="item in 11" :key="item"
             class="bg-rose-300" :class="[
                {' mb-20': item === 1},
                {' mb-48 -mr-8': item === 2},
                {'mb-28 ml-8 -mr-8': item === 3},
                {'mb-28 ml-8': item === 4},
                {' -mt-20 mb-8': item === 5},
                {' -mt-48 mb-16 -mr-8': item === 6},
                {'col-span-2 -mt-28 mb-16 ml-8': item === 7},
                {'-mt-8': item === 8},
                {'-mt-16 ': item === 9},
                {'-mt-16 ': item === 10},
                {'-mt-16': item === 11},
            ]">
                <img :src="`./img/png/main_art/${item}.png`" alt="#" class="min-w-full min-h-full">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>