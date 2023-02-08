<template>
    <div>
        <WidgetsColectionNFT class="2xl:my-28 xl:my-20 my-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:mb-8 mb-4">
                    <template #top>Collection</template>
                    <template #title>NFT Collection </template>
                    <template #title-span> Art</template>
                </SharedSectionHeader>
            </template>
        </WidgetsColectionNFT>

        <WidgetsArt class="2xl:mb-28 xl:mb-20 mb-16">
            <SharedSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                <template #title>
                    NFT art, Domain name, Stachu, Collection Gallery
                </template>
                <template #bottom>
                    It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged
                </template>
            </SharedSectionHeader>
        </WidgetsArt>

        <WidgetsGalleryByCategor class="2xl:mb-32 xl:mb-24 mb-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #top>NFT Marketplace</template>
                    <template #title>NFT all Category</template>
                </SharedSectionHeader>
            </template>
        </WidgetsGalleryByCategor> 

        <WidgetsOtherInfo class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #top>NFT Marketplace</template>
                    <template #title>The Largest NFT MarketPlace</template>
                </SharedSectionHeader>
            </template>
        </WidgetsOtherInfo> 

        <WidgetsGalleryCard class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #top>Live Auction</template>
                    <template #title>NFT Live Auction</template>
                </SharedSectionHeader>
            </template>
        </WidgetsGalleryCard> 

        <WidgetsBestUser class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:mb-8 mb-4">
                    <template #top>Seller</template>
                    <template #title>NFT Best Seller </template>
                    <template #title-span> Last 7 Day</template>
                    <template #bottom>It has survived not only five centuries, but also the leap into</template>
                </SharedSectionHeader>
            </template>
        </WidgetsBestUser> 

        <WidgetsInformationAboutCreation class="2xl:mb-28 mb-16"/> 

        <WidgetsRoadMap>
            <template #title>
                <SharedSectionHeader class="group title-color-purple 2xl:mb-12 xl:mb-8 mb-4">
                    <template #title>NFT roadmap</template>
                    <template #bottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo ipsum
                        aliquet turpis elit elit natoque varius</template>
                </SharedSectionHeader>
            </template>
        </WidgetsRoadMap> 

         <WidgetsUserCommit class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:md-8 md:mb-4 mb-0">
                    <template #title>Hear From Our Happy Users</template>
                    <template #bottom v-if="!isMobile">It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged</template>
                </SharedSectionHeader>
            </template>
        </WidgetsUserCommit> 

        <WidgetsBlogCard class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <SharedSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #title>Our Latest Blog</template>
                    <template #bottom>It has survived not only five centuries, but also the</template>
                </SharedSectionHeader>
            </template>
        </WidgetsBlogCard>
        
    </div>
</template>

<script setup lang="ts">
const { isMobile } = useDevice()
</script>