<template>
    <slot name="buttom" v-bind="{ userData, updateStage }">
        <UIButtomStan class="text-white bg-rose-600 rounded-full px-6" :class="{ 'bg-violet-500': userData }"
            @click="updateStage">
            Start Collecting
        </UIButtomStan>
    </slot>
    <EntitiesModalWindowTransition class="h-min w-[450px] sm:w-[calc(100vw-2rem)] z-50" :active="stage">
        <div class="py-8 px-12 rounded-3xl bg-gradient-to-br 
        sm:py-6 sm:px-6" :class="[userData ? 'to-purple-300 from-white' : 'from-indigo-500 to-purple-600']">
            <template v-if="userData">
                <TheUserMain />
            </template>

            <template v-else>
                <h3 class="text-4xl text-center font-medium text-white mb-7">{{
                    modalLogin ? 'Авторизация': 'Регистрация'
                }}</h3>
                <TheUserLogin v-if="modalLogin" :functionModal="updateStage" :active="stage" />
                <TheUserRegister v-else :active="stage" />
                <div class="decor-line mt-6 mb-3"></div>
                <p class="text-center text-white cursor-pointer" @click="modalLogin = !modalLogin">{{
                    modalLogin ? 'Создать аккаунт': 'Войти в аккаунт'
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

</script>
