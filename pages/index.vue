<template>
    <div>
        <MainArt />
        <ModelGalleruCategor>
            <template>
                <SharedSectionHeader>
                    <template #top>Live Auction</template>
                    <template #title>NFT Live Auction</template>
                </SharedSectionHeader>
            </template>
        </ModelGalleruCategor>
        <ModelGalleryByCategor>
            <template #titke>
                <SharedSectionHeader>
                    <template #top>NFT Marketplace</template>
                    <template #title>NFT all Category</template>
                </SharedSectionHeader>
            </template>
        </ModelGalleryByCategor>
        <MainBestUser />
        <ModelSladerblogCard>
            <template #title>
                <SharedSectionHeader>
                    <template #title>Our Latest Blog</template>
                    <template #bottom>It has survived not only five centuries, but also the</template>
                </SharedSectionHeader>
            </template>
        </ModelSladerblogCard>
    </div>
</template>

<script setup lang="ts">

</script>