<template>
    <div>
        <WidgetsArt>
            <SharedSectionHeader class="m-12">
                <template #title>
                    NFT art, Domain name, Stachu, Collection Gallery
                </template>
                <template #bottom>
                    It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged
                </template>
            </SharedSectionHeader>
        </WidgetsArt>
        <WidgetsGalleryCard>
            <template #title>
                <SharedSectionHeader>
                    <template #top>Live Auction</template>
                    <template #title>NFT Live Auction</template>
                </SharedSectionHeader>
            </template>
        </WidgetsGalleryCard>
        <WidgetsGalleryByCategor>
            <template #title>
                <SharedSectionHeader>
                    <template #top>NFT Marketplace</template>
                    <template #title>NFT all Category</template>
                </SharedSectionHeader>
            </template>
        </WidgetsGalleryByCategor>
        <WidgetsBestUser>
            <template #title>
                <SharedSectionHeader class="mb-12">
                    <template #top>Seller</template>
                    <template #title>NFT Best Seller </template>
                    <template #title-span> Last 7 Day</template>
                    <template #bottom>It has survived not only five centuries, but also the leap into</template>
                </SharedSectionHeader>
            </template>
        </WidgetsBestUser>
        <WidgetsBlogCard>
            <template #title>
                <SharedSectionHeader>
                    <template #title>Our Latest Blog</template>
                    <template #bottom>It has survived not only five centuries, but also the</template>
                </SharedSectionHeader>
            </template>
        </WidgetsBlogCard>
    </div>
</template>