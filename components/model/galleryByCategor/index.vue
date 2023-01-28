<template>
<section>
    <div>
        <div>
            <slot name="title"></slot>
        </div>
        <div class="grid grid-cols-3 gap-8">
            <Item
            v-for="item in arrTags"
            :key="item"
            :tagsSearch="item"/>
        </div>
    </div>
</section>
</template>
<script setup lang="ts">
import Item from "./item.vue";
const arrTags = [
    'Photos', 'Art', '3D Art', 'Collectibles', 'Stachu', '2D'
]
</script>