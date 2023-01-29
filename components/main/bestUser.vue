<template>
    <section>
        <div>
            <SharedSectionHeader class="mb-12">
                <template #top>Seller</template>
                <template #title>NFT Best Seller </template>
                <template #title-span> Last 7 Day</template>
                <template #bottom>It has survived not only five centuries, but also the leap into</template>
            </SharedSectionHeader>
            <div>
                <div class="grid grid-cols-3 gap-8">
                    <div v-for="(item, index) in (data || 9)" :key="index"
                    class="p-3 shadow-md rounded-2xl">
                    <div class="flex">
                        <template v-if="data">
                            <div class="w-1/4">
                                <img :src="item.profileImage" alt=""  class="w-full">
                            </div>
                            <div class="flex grow">
                                <div class="grow px-4 flex flex-col">
                                    <p v-if="item.name" class="text-lg font-bold text-gray-700"
                                    >{{  item.name }}</p>
                                    <p class=" text-gray-700 font-medium grow">@{{  item.username }}</p>
                                    <p class="text-gray-500">{{ item.card.length }} Item</p>
                                </div>
                                <div class="px-2 py-1  aspect-square self-end shadow rounded-full text-xs font-bold"
                                >{{  item.ranting }}</div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="w-1/4">
                                <div class="bg-rose-300 rounded-xl aspect-square"></div>
                            </div>
                            <div class="flex grow">
                                <div class="grow self-center flex justify-center">
                                    <UIIconLoader/>
                                </div>
                                <div class="px-2 py-1  aspect-square self-end shadow rounded-full text-xs font-bold"
                                >{{ item }}</div>
                            </div>
                        </template>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">

const data = await productgetTopUser({
    orderBy: { ranting: 'asc'},
    take: 9,
    ...selectUserForCard({ ranting: true, card: true })
})


</script>
