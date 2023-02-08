<template>
    <section>
        <EntitiesBaseGallery :data="data">
            <template #title><slot name="title"></slot></template>
            <template #item="{ item }">
                <EntitiesItemProductCard :data="item" v-if="item"/>
                <EntitiesItemBase v-else/>
            </template>
        </EntitiesBaseGallery>
    </section>
</template>

<script setup lang="ts">

const { isMobile } = useDevice()
const { data, error } = await productSearchByCategor({
    where: { news: true },
    take: isMobile ? 8 : 9,
    ...selectNFTCard({ author: { ...selectUserForCard()} })
}, 'galleryCard')  

</script>