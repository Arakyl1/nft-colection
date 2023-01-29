<template>
<section >
    <div>
        <slot name="title">

        </slot>
        <div>
            <div class="grid grid-cols-3 gap-8"> 
                <Item v-for="item in (data || 9)" :key="item.id" :data="item"/>
            </div>
        </div>
    </div>
</section>
</template>

<script setup lang="ts">
import Item from "./item.vue";

const { data, error } = await productSearchByCategor({
    where: { news: true },
    take: 9,
    ...selectNFTCard({ author: { ...selectUserForCard()} })
}, 'galleryCard')  


</script>