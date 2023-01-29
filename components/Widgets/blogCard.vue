<template>
    <section>
        <EntitiesSladerBase :data="cardBlog" :container-class="'[grid-auto-columns:calc(100%/3)] pb-4'">
            <template #header>
                <slot name="title"></slot>
            </template>
            <template #item="{ elem }">
                <EntitiesItemBlogCard :data="elem" v-if="elem" />
                <EntitiesItemBase v-else />
            </template>
        </EntitiesSladerBase>
    </section>
</template>

<script setup lang="ts">

const { data: cardBlog } = await blogGetDataByAttrebutes('caruselBlog', {
    where: { attributes: { some: { name: 'Collectibles' } } },
    take: 3,
    ...selectBlogCard()
})

</script>