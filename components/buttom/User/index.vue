<template>
    <slot name="buttom" v-bind="{ userData, updateStage }">
        <ButtomStandart class="text-white bg-rose-600 rounded-full px-6"
        :class="{ 'bg-violet-500': userData}"
        @click="updateStage">
            Start Collecting
        </ButtomStandart>
    </slot>
    <OtherModalTransition class="h-min w-[450px] sm:w-[calc(100vw-2rem)] z-50" :active="stage">
        <div class="py-8 px-12 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600
        sm:py-6 sm:px-6">
            <!-- <template v-if="userData">
                <ButtomUserMain/>
            </template>
            -->
            <template v-if="true">
                <h3 class="text-4xl text-center font-medium text-white mb-7"
                >{{ modalLogin ? 'Авторизация' : 'Регистрация' }}</h3>
                    <ButtomUserLogin v-if="modalLogin" :functionModal="updateStage" :active="stage"/>
                    <ButtomUserRegister v-else :active="stage"/>
                <div class="decor-line mt-6 mb-3"></div>
                <p class="text-center text-white cursor-pointer"
                @click="modalLogin = !modalLogin"
                >{{ modalLogin ? 'Создать аккаунт' : 'Войти в аккаунт' }}</p>
            </template>
            
        </div>
    </OtherModalTransition>
</template>
<script setup lang="ts">
import { userActive } from "@/pinia/store"
import ShowContent from "~~/utils/ShowContent";

const { stage, updateStage } = ShowContent()
const modalLogin = ref<boolean>(true)
const userActiveFun = userActive()
const { userData } = storeToRefs(userActiveFun)

</script>
