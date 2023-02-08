<template>
    <div>
        <slot></slot>
        <div class="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 lg:gap-4 sm:gap-3 gap-2">
            <div v-for="item in 11" :key="item"
             class="bg-rose-300 border-[7px] border-slate-900 relative overflow-hidden" :class="[
                {' md:mb-20  sm:mb-12 mb-8': item === 1},
                {'md:mb-48 md:-mr-8': item === 2},
                {'md:mb-28 md:ml-8 md:-mr-8  sm:mb-8 sm:mt-0  -mt-8 mb-4': item === 3},
                {'md:mb-28 md:ml-8 md:mt-0   sm:-mt-12 ': item === 4},
                {'md:-mt-20 md:mb-8  -mt-4': item === 5},
                {'md:-mt-48 md:mb-16 md:-mr-8    sm:-mt-8 ': item === 6},
                {'col-span-2 md:-mt-28 md:mb-16 md:ml-8': item === 7},
                {'md:-mt-8 md:mb-0  sm:mb-12 sm:mr-0  -mr-4': item === 8},
                {'md:-mt-16 md:mr-0   sm:mr-8 sm:ml-0  ml-4': item === 9},
                {'md:-mt-16 md:ml-0   sm:-ml-8': item === 10},
                {'md:-mt-16    sm:-mt-12': item === 11},
            ]">
                <img :src="`./img/png/main_art/${item}.png`" alt="#"
                class="min-w-full min-h-full scale-105 object-cover">
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>