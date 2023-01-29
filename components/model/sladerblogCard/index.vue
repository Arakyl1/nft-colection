<template>
    <section>
        <div>
            <slot name="title"></slot>
        </div>
        <div>
            <Slader :data="cardBlog" :container-class="'[grid-auto-columns:calc(100%/3)] pb-4'">
                <template #item="{ elem }">
                    <SladerItem :data="elem"/>
                </template>
            </Slader>
        </div>
    </section>
</template>

<script setup lang="ts">
import SladerItem from "./item.vue";

const { data: cardBlog } = await blogGetDataByAttrebutes('caruselBlog', {
    where: { attributes: { some: { name: 'Collectibles' } } },
    take: 3,
    ...selectBlogCard()
})

</script>