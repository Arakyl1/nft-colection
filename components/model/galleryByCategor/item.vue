<template>
    <template v-if="!error">

        <div class="shadow-lg p-2 flex flex-col">
            <div class="grow grid grid-cols-2 gap-2">
                <div v-for="(item, index) in NFTdata" :key="item.id" class="rounded overflow-hidden" :class="[
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
                    <p class="font-medium text-xl">{{ tagsSearch }}</p>
                    <p class="text-sm">{{ attributesArrLength }} Item</p>
                </div>
                <div>
                    <UIButtomStan class="bt-base p-0 flex items-center text-rose-600">
                        View All
                        <UIIconArrow class="ml-2" />
                    </UIButtomStan>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
const props = defineProps<{ tagsSearch: string }>()

const { data: NFTdata, error } = await productSearchByCategor({
    where: { attributes: { some: { name: props.tagsSearch } } },
    take: 4,
    select: { img: true, id: true }
}, `galleryCategor_${props.tagsSearch}`)


const { data: attributes } = await productSearchByAttributes({
    where: { name: props.tagsSearch },
    include: {
        nftCardId: {
            select: {
                id: true
            }
        }
    }
}, `searchByAttributes_${props.tagsSearch}`)

const attributesArrLength = computed(() => attributes.value ? attributes.value[0].nftCardId.length : 0)
</script>