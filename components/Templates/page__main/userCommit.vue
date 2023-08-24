<template>
    <section class="z-10">
        <slot name="title"></slot>
        <div>
            <MoleculesSladerBase :data="data">
                <template #item="{ elem }">
                    <div class="">
                        <MoleculesArticleComment :data="elem" />
                    </div>
                </template>
                <template #bottom="{ indexActiveButton, updateScrolLeftSlader }">
                    <div class="2xl:pt-12 lg:pt-8 xs:pt-4 pt-0">
                        <ul class="flex justify-center" v-if="data && data.length">
                            <li v-for="item in data.length" :key="item" class="mx-1 cursor-pointer"
                            @click="updateScrolLeftSlader(item - 1)">
                                <div class=" h-2 rounded-full transition-all"
                                :class="[ (item - 1) === indexActiveButton ? 'xs:w-16 w-12 bg-rose-600' : 'xs:w-8 w-6 bg-gray-300' ]"></div>
                            </li>
                        </ul>
                    </div>
                </template>
            </MoleculesSladerBase>

        </div>
    </section>
</template>

<script setup lang="ts">


const { data } = await useFetch('/api/comment/find', {
    method: 'GET',
    server: false,
    params: { rating: `gte:0`, limit: 9, include: 'author,card' },
    retry: 3,
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        }
        return [] 
    }
})
</script>