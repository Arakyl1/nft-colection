<template>
       <EntitiesModalWindowTransition class="h-min sm:w-[450px] w-[calc(100vw-1rem)] z-50" :active="stage">
        <div class="py-6 px-6 rounded-3xl bg-gradient-to-br 
        sm:py-8 sm:px-12" :class="[userData ? 'to-purple-300 from-white' : 'from-indigo-500 to-purple-600']">
            <template v-if="userData">
                <EntitiesAuthMain />
            </template>

            <template v-else>
                <h3 class="text-4xl text-center font-medium text-white mb-7">{{
                    modalLogin? 'Авторизация': 'Регистрация'
                }}</h3>

                <EntitiesAuthLogin :active="stage" v-if="modalLogin" />
                <EntitiesAuthRegister :active="stage" v-else />

                <div class="decor-line mt-6 mb-3"></div>
                <p class="text-center text-white cursor-pointer" @click="modalLogin = !modalLogin">{{
                    modalLogin? 'Создать аккаунт': 'Войти в аккаунт'
                }}</p>
            </template>

        </div>
    </EntitiesModalWindowTransition>
</template>

<script setup lang="ts">
import ShowContent from "@/utils/ShowContent";

const { stage, updateStage } = ShowContent()
const { userData } = useStoreUser()
const modalLogin = ref<boolean>(true)

onBeforeMount(() => {
    window.addEventListener('createUser', updateStage)
})

const style = {
    input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}
</script>