<template>
    <section class="z-10">
        <slot name="title"></slot>
        <div>
            <EntitiesSladerBase :data="data">
                <template #item="{ elem }">
                    <div class="">
                        <EntitiesItemComment :data="elem" />
                    </div>
                </template>
                <template #bottom="{ indexActiveButton, updateScrolLeftSlader }">
                    <div class="2xl:pt-12 lg:pt-8 xs:pt-4 pt-0">
                        <ul class="flex justify-center">
                            <li v-for="item in data.length" :key="item" class="mx-1 cursor-pointer"
                            @click="updateScrolLeftSlader(item - 1)">
                                <div class=" h-2 rounded-full transition-all"
                                :class="[ (item - 1) === indexActiveButton ? 'xs:w-16 w-12 bg-rose-600' : 'xs:w-8 w-6 bg-gray-300' ]"></div>
                            </li>
                        </ul>
                    </div>
                </template>
            </EntitiesSladerBase>

        </div>
    </section>
</template>

<script setup lang="ts">

const { data } = await commentGet('comment_user', {
    where: { ranting: { gte: 1 } },
    select: {
        id: true,
        ranting: true,
        text: true,
        card: {
            select: {
                img: true,
                id: true,
            }
        },
        author: {
            select: {
                id: true,
                username: true,
                name: true,
                profileImage: true
            }
        }
    }
})
</script>