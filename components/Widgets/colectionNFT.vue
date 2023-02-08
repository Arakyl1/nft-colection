<template>
    <section>
        <EntitiesSladerBase :data="data"
        :container-class="'lg:[grid-auto-columns:calc(100%/3)] sm:[grid-auto-columns:calc(100%/2)] [grid-auto-columns:calc(100%)] pb-4'">
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