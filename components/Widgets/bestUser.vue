<template>
    <section>
        <EntitiesBaseGallery :data="data">
            <template #title>
                <slot name="title"></slot>
            </template>
            <template #item="{ item }">
                <EntitiesItemUserCard v-if="data" :data="item" />
                <template v-else>
                    <div class="w-1/4">
                        <div class="bg-rose-300 rounded-xl aspect-square"></div>
                    </div>
                    <div class="flex grow">
                        <div class="grow self-center flex justify-center">
                            <UIIconLoader />
                        </div>
                        <div class="px-2 py-1  aspect-square self-end shadow rounded-full text-xs font-bold">{{ item }}
                        </div>
                    </div>
                </template>
            </template>
        </EntitiesBaseGallery>
    </section>
</template>
<script setup lang="ts">
const { isMobile } = useDevice()
const data = await productgetTopUser({
    orderBy: { ranting: 'asc' },
    take: isMobile ? 8 : 9,
    ...selectUserForCard({ ranting: true, card: true })
})


</script>
