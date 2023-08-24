<template>
    <section>
        <MoleculesListGallery :data="data ? data: null" >
            <template #title><slot name="title"></slot></template>
            <template #item="{ item }">
                <MoleculesArticleNft :data="item" v-if="item" class="mx-2 last:block sm:last:hidden lg:last:block"/>
                <MoleculesArticleStardart v-else/>
            </template> 
        </MoleculesListGallery>
    </section>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/nftCard/find', {
    method: 'GET',
    server: false,
    params: { createAt: `gte:${Date.now() - 31557600000}`, limit: 9, 'include': 'author,attributes' },
    retry: 3,
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        }
        return [] 
    }
})

</script>