<template>
    <section>
        <MoleculesListGallery :data="data">
            <template #title>
                <slot name="title"></slot>
            </template>
            <template #item="{ item }">
                <MoleculesArticleUser v-if="data" :data="item" class="mx-2 last:block sm:last:hidden lg:last:block"/>
                <template v-else>
                    <div class="w-1/4">
                        <div class="bg-rose-300 rounded-xl aspect-square"></div>
                    </div>
                    <div class="flex grow">
                        <div class="grow self-center flex justify-center">
                            <AtomIconLoader />
                        </div>
                        <div class="px-2 py-1  aspect-square self-end shadow rounded-full text-xs font-bold">{{ item }}
                        </div>
                    </div>
                </template>
            </template>
        </MoleculesListGallery>
    </section>
</template>
<script setup lang="ts">
const { data } = await useFetch('/api/user/find', {
    method: 'GET',
    server: false,
    params: { createAt: `gte:0`, limit: 9, orderBy: 'ranting:desc', include: 'card' },
    retry: 3,
    transform: (context) => {
        if (context && 'data' in context && Array.isArray(context.data)) {
            return context.data
        }
        return [] 
    }
})

</script>
