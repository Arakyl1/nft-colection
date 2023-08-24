<template>
    <div class="shadow-lg p-2 flex flex-col" v-if="data">
        <div class="grow grid grid-cols-2 gap-2">
                <div v-for="(item, index) in (data.nftCardId as Array<any>).slice(0,4)" :key="item.id" class="rounded overflow-hidden" :class="[
                    { 'mb-4': index === 0 },
                    { '-mb-4': index === 1 },
                    { '-mt-4': index === 2 },
                    { 'mt-4': index === 3 },
                ]">
                    <img :src="item.img" :alt="item.id" class="min-h-full min-w-full object-cover">
                </div>
            </div>
            <div class="flex items-center py-2">
                <div class="grow">
                    <p class="font-medium text-xl">{{ data.name }}</p>
                    <p class="text-sm">{{ data.nftCardId.length }} Item</p>
                </div>
                <div>
                    <AtomButtonStandart class="bt-base p-0 flex items-center text-rose-600">
                        View All
                        <IconArround class="ml-2" />
                    </AtomButtonStandart>
                </div>
            </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{ data: any }>()
</script>
