<template>
    <section>
        <EntitiesSladerBase :data="cardBlog"
        :container-class="'lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)] [grid-auto-columns:calc(100%)] pb-4'">
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