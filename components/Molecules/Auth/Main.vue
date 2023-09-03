<template>
    <div class="sm:mx-0 -mx-2">
        <template v-if="_userData">
            <div class="flex items-center mb-6 sm:mb-4">
                <img class="w-12 aspect-square rounded-full mr-6" :src="_userData.profileImage" alt="user_photo">
                <h3 class="text-2xl">{{ _userData.username }}</h3>
            </div>
        </template>
        <div class="decor-line"></div>
        <div>
            <div class="mb-4">
                <template v-for="(elem, index) in list" :key="index">
                    <ul v-if="Array.isArray(elem.data)" class="sm:pt-3 sm:pb-1 sm:pl-2 pt-2 pb-0">
                        <li v-for="item in elem.data" :key="item" class="mb-2 text-lg hover:text-yellow-500 transition cursor-pointer">
                            {{ item }}
                        </li>
                    </ul>
                    <div v-else-if="elem.decorLine" class="decor-line"></div>
                </template>
            </div>
            <AtomButtonStandart @click.stop="logoutUser"
            class="bg-rose-600 text-white py-3 rounded-full px-5"
            >Выйти</AtomButtonStandart>
        </div>
    </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";

const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)
const { logout: _logout } = useAuth()

const list = [
    { data: ['Корзина'] },
    { decorLine: true },
    { data: ['Избранные товары', 'Просмотренные', 'Списки сравнения', 'Лист ожилания'] },
    { decorLine: true },
    { data: ['Бонусный счет', 'Личные данные', 'История покупок', 'Отзывы и вопросы'] }
]

function logoutUser() {
    storeUser.update(null) 
    _logout()
}
</script>
