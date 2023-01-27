<template>
<section>
    <div>
        <OtherElseSectionHeader>
            <template #top>NFT Marketplace</template>
            <template #title>NFT all Category</template>
        </OtherElseSectionHeader>
        <div class="grid grid-cols-3 gap-8">
            <MainGalleryCategorItem
            v-for="item in arrTags"
            :key="item"
            :tagsSearch="item"/>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
const arrTags = [
    'Photos', 'Art', '3D Art', 'Collectibles', 'Stachu', '2D'
]
</script>