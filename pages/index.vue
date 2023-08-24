<template>
    <div>
         <TemplatesPageMainColectionNFT class="2xl:my-28 xl:my-20 my-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:mb-8 mb-4">
                    <template #top>Collection</template>
                    <template #title>NFT Collection </template>
                    <template #title-span> Art</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainColectionNFT>

        <TemplatesPageMainArt class="2xl:mb-28 xl:mb-20 mb-16">
            <AtomOtherSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                <template #title>
                    NFT art, Domain name, Stachu, Collection Gallery
                </template>
                <template #bottom>
                    It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged
                </template>
            </AtomOtherSectionHeader>
        </TemplatesPageMainArt>

        <TemplatesPageMainGalleryByCategor class="2xl:mb-32 xl:mb-24 mb-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #top>NFT Marketplace</template>
                    <template #title>NFT all Category</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainGalleryByCategor> 

        <TemplatesPageMainOtherInfo class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #top>NFT Marketplace</template>
                    <template #title>The Largest NFT MarketPlace</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainOtherInfo> 

        <TemplatesPageMainGalleryCard class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #top>Live Auction</template>
                    <template #title>NFT Live Auction</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainGalleryCard>

        <TemplatesPageMainBestUser class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:mb-8 mb-4">
                    <template #top>Seller</template>
                    <template #title>NFT Best Seller </template>
                    <template #title-span> Last 7 Day</template>
                    <template #bottom>It has survived not only five centuries, but also the leap into</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainBestUser> 

        <TemplatesPageMainInformationAboutCreation class="2xl:mb-28 mb-16"/> 

        <TemplatesPageMainRoadMap>
            <template #title>
                <AtomOtherSectionHeader class="group title-color-purple 2xl:mb-12 xl:mb-8 mb-4">
                    <template #title>NFT roadmap</template>
                    <template #bottom>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo ipsum
                        aliquet turpis elit elit natoque varius</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainRoadMap> 

         <TemplatesPageMainUserCommit class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:md-8 md:mb-4 mb-0">
                    <template #title>Hear From Our Happy Users</template>
                    <template #bottom v-if="!isMobile">It has survived not only five centuries, but also the leap into
                        electronic typesetting, remaining essentially unchanged</template>
                </AtomOtherSectionHeader>
            </template>
         </TemplatesPageMainUserCommit> 

        <TemplatesPageMainBlogCard class="2xl:mb-28 xl:mb-20 mb-16">
            <template #title>
                <AtomOtherSectionHeader class="2xl:mb-12 xl:md-8 mb-4">
                    <template #title>Our Latest Blog</template>
                    <template #bottom>It has survived not only five centuries, but also the</template>
                </AtomOtherSectionHeader>
            </template>
        </TemplatesPageMainBlogCard>
        
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    keepalive: true
})
useHead({
    title: 'Main page',
    
})
const { isMobile } = useDevice()
</script>