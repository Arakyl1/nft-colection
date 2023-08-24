<template >
    <div class="shadow-md p-4 rounded-2xl">
        <div class="flex items-center">
            <div class="min-w-[50px] max-w-[50px]">
                <img :src="data.profileImage" alt="" class="w-full">
            </div>
            <div class="flex grow">
                <div class="grow px-4 flex flex-col">
                    <p v-if="data.name" class="xl:text-lg font-bold text-gray-700">{{ data.name }}</p>
                    <p class=" text-gray-700 font-medium grow xl:text-base text-sm truncate	">@{{ data.username }}</p>
                    <p class="text-gray-500 lg:text-base text-sm">{{ data.card.length }} Item</p>
                </div>
                <div class="px-2 py-1 aspect-square self-end shadow rounded-full text-xs font-bold">{{ data.ranting }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User, NFTCard } from '@/type/index';

interface UpdateUser extends User {
    card: NFTCard[]
}

defineProps<{ data: UpdateUser }>()
</script>