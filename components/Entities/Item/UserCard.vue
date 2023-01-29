<template >
    <div class="shadow-md p-4 rounded-2xl flex">
        <div class="w-1/4">
            <img :src="data.profileImage" alt="" class="w-full">
        </div>
        <div class="flex grow">
            <div class="grow px-4 flex flex-col">
                <p v-if="data.name" class="text-lg font-bold text-gray-700">{{ data.name }}</p>
                <p class=" text-gray-700 font-medium grow">@{{ data.username }}</p>
                <p class="text-gray-500">{{ data.card.length }} Item</p>
            </div>
            <div class="px-2 py-1  aspect-square self-end shadow rounded-full text-xs font-bold">{{ data.ranting }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { User } from '~~/utils/type';

interface UpdateUser extends  User{
    card: object[]
}

defineProps<{ data: UpdateUser }>()
</script>