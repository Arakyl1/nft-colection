<template>
    <section>
        <div>
            <Slader :data="cardBlog" :container-class="'[grid-auto-columns:calc(100%/3)]'"/>
        </div>
    </section>
</template>

<script setup lang="ts">
const { getDataByAttrebutes } = useBlogs()

const { data: cardBlog } = await getDataByAttrebutes('caruselBlog', {
    where: { attributes: { some: { name: 'Collectibles'} } },
    take: 3,
    ...selectBlogCard()
})
</script>