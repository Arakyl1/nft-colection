<template>
<section>
    <div>
        <OtherElseSectionHeader>
            <template #top>Live Auction</template>
            <template #title>NFT Live Auction</template>
        </OtherElseSectionHeader>
        <div>
            <div class="grid grid-cols-3 gap-8"> 
                <MainGalleryItem v-for="item in (data || 9)" :key="item.id" :data="item"/>
            </div>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
const { getNFTCardBySelecCat } = useProduct()

const { data, error } = await getNFTCardBySelecCat({
    where: { news: true },
    take: 9,
    ...selectNFTCard({ author: { ...selectUserForCard()} })
}, 'galleryCard')  

</script>