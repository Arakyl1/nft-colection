<template>
    <section>
        <EntitiesSladerBase :data="data" :container-class="'[grid-auto-columns:calc(100%/3)] pb-4'">
            <template #header><slot name="title"></slot></template>
            <template #item="{ elem }">
                <EntitiesItemColectionCard :data="elem" v-if="elem"/>
                <EntitiesItemBase v-else/>
            </template>
        </EntitiesSladerBase>
    </section>
</template>

<script setup lang="ts">

const { data } = await colectionSearchByCategor('colection', {
    where: { ranting: { gte: 0 } },
    take: 3,
    ...selectColection()
})
</script>