<template>
    <div class="sm:mx-0 -mx-2">
        <template v-if="userData">
            <div class="flex items-center mb-6 sm:mb-4">
                <img class="w-12 aspect-square rounded-full mr-6" :src="userData.profileImage" alt="user_photo">
                <h3 class="text-2xl">{{ userData.username }}</h3>
            </div>
        </template>
        <div class="decor-line"></div>
        <div>
            <div class="mb-4">
                <template v-for="(elem, index) in list" :key="index">
                    <ul v-if="Array.isArray(elem.data)" class="sm:pt-3 sm:pb-1 sm:pl-2 pt-2 pb-0">
                        <li v-for="item in elem.data" :key="item" class="mb-2 text-lg hover:text-yellow-500 transition">
                            {{ item }}
                        </li>
                    </ul>
                    <div v-else-if="elem.decorLine" class="decor-line"></div>
                </template>
            </div>
            <SharedApiAuthLogout>
                <template #default="{ userLogout }">
                    <UIButtomStan class="bg-rose-500 text-white py-3 rounded-full px-5" @click="userLogout">
                        Выйти
                    </UIButtomStan>
                </template>
            </SharedApiAuthLogout>
        </div>
    </div>
</template>
<script setup lang="ts">
const { userData } = useStoreUser()

const list = [
    { data: ['Корзина'] },
    { decorLine: true },
    { data: ['Избранные товары', 'Просмотренные', 'Списки сравнения', 'Лист ожилания'] },
    { decorLine: true },
    { data: ['Бонусный счет', 'Личные данные', 'История покупок', 'Отзывы и вопросы'] }
]
</script>
