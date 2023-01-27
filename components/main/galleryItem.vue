<template>
<div>
    <div class="shadow-lg p-5">
        <template v-if="(typeof data) !== 'number'">
            <div>
                <img :src="data.img" :alt="data">
            </div>
            <div class="py-4 flex">
                <div class="flex grow">
                    <img src="@/assets/img/svg/icon/box.svg" alt="box" class="mr-2">
                    <p class="text-rose-500 text-sm"
                    >{{ data.quantity ? `${data.quantity} Product Available`: 'Not Available Product' }}</p>
                </div>
                <div>
                    <ButtomAddFavorite :id="data.id"/>
                </div>
            </div>
            <div class="flex mb-6">
                <div class="aspect-square w-10 rounded-full overflow-hidden">
                    <img :src="data.author.profileImage" alt="profileImage">
                </div>
                <div class="grow px-3">
                    <p>{{ data.author.name  }}</p>
                    <p class="text-xs">@{{ data.author.username  }}</p>
                </div>
                <div class="text-right">
                    <p class="text-xs">Current Bid</p>
                    <p>{{  data.price + " " + data.currency}}</p>
                </div>
            </div>
            <div class="text-center">
                <ButtomAddBasket :id="data.id"/>

            </div>
        </template>
       
    </div>
</div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ data: object | number }>(), { data: 0})

// const { getNFTCardBySelecCat } = useProduct()

// const { data } = await getNFTCardBySelecCat({
//     where: { attributes: { has: props.searchText } },
//     select: { id: true, img: true },
//     take: 4
// })
</script>