<template>
    <section>
        <MoleculesSladerBase :data="data"
        :container-class="'lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)] [grid-auto-columns:calc(100%)] pb-4'">
            <template #header><slot name="title"></slot></template>
            <template #item="{ elem }">
                <MoleculesArticleUserColection :data="elem" v-if="elem"/>
                <MoleculesArticleStardart v-else/>
            </template>
            <template #bottom="{ prevItem, nextItem, sladerValueScroll }">
                <template v-if="sladerValueScroll.max > 0">
                    <MoleculesSladerControl :prev-item="prevItem" :next-item="nextItem" :slader-value-scroll="sladerValueScroll"/>
                </template>
            </template>
        </MoleculesSladerBase>
        <div class="pt-4 flex justify-center">
            <AtomButtonStandart class="button-1 py-2 bg-rose-600 hover:bg-rose-500 text-white after:content-none">View All Category</AtomButtonStandart>
        </div>
    </section>
</template>

<script setup lang="ts">

const { data } = await useFetch('/api/colection/find', {
    method: 'GET',
    server: false,
    params: { views: 'gte:0', limit: 12, 'include': 'author,attributes,nFTCard_t:3' },
    retry: 3,
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        }
        return [] 
    }
})
</script>