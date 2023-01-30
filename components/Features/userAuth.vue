<template>
    <slot name="buttom">
        <SharedButtomBase @click="updateStage" class="bg-rose-600 border-0 py-3 text-white after:content-none" :class="{ 'bg-violet-500': userData }">
            Start Collecting
        </SharedButtomBase>
    </slot>
    <EntitiesModalWindowTransition class="h-min w-[450px] sm:w-[calc(100vw-2rem)] z-50" :active="stage">
        <div class="py-8 px-12 rounded-3xl bg-gradient-to-br 
        sm:py-6 sm:px-6" :class="[userData ? 'to-purple-300 from-white' : 'from-indigo-500 to-purple-600']">
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