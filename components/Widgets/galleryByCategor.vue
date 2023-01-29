<template>
<section>
    <EntitiesBaseGallery :data="arrTags">
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #item="{ item }">
            <EntitiesItemForCategor :tags-search="item"/>
        </template>
    </EntitiesBaseGallery>
</section>
</template>
<script setup lang="ts">
const arrTags = [
    'Photos', 'Art', '3D Art', 'Collectibles', 'Stachu', '2D'
]
</script>