<template>
<section>
    <MoleculesListGallery :data="data ? data : null">
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #item="{ item }">
            <MoleculesArticleStardart v-if="(typeof item === 'number')"  class="aspect-square"/>
            <MoleculesArticleColection :data="item" v-else class="h-full"/>
        </template>
    </MoleculesListGallery>
</section>
</template>
<script setup lang="ts">
const arrTags = [
    'Photos', 'Art', '3D Art', 'Collectibles', 'Stachu', '2D'
]

const { data } = await useFetch('/api/attributes/find', {
    method: 'GET',
    server: false,
    params: { 'name': 'in:' + arrTags.join(','), include: 'nftCardId' },
    retry: 3,
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        }
        return [] 
    }
})
</script>