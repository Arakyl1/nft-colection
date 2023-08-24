<template>
    <section>
        <MoleculesSladerBase :data="data ? data[0].blogCard || null : null "
        :container-class="'lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)] [grid-auto-columns:calc(100%)] pb-4'">
            <template #header>
                <slot name="title"></slot>
            </template>
            <template #item="{ elem }">
                <MoleculesArticleBlog :data="elem" v-if="elem" />
                <MoleculesArticleStardart v-else />
            </template>
            <template #bottom="{ prevItem, nextItem, sladerValueScroll }">
                <MoleculesSladerControl :prev-item="prevItem" :next-item="nextItem" :slader-value-scroll="sladerValueScroll"/>
            </template>
        </MoleculesSladerBase>
    </section>
</template>

<script setup lang="ts">

const { data } = await useFetch('/api/attributes/find', {
    method: 'GET',
    server: false,
    params: { name: 'contains:Collectibles', limit: 4, 'include': 'blogCard_t:4' },
    retry: 1,
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        }
        return [] 
    }
})
</script>