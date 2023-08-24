<template>
    <form>
        <input type="text" :class="style.input" class="mb-4" placeholder="Логин" v-model="data.username" />
        <input type="password" :class="style.input" class="mb-8" placeholder="Пароль" autocomplete="on"
            v-model="data.password" />
        <AtomButtomStandart @click="checkValidData()" class="bg-rose-500 rounded-full text-lg text-white w-full py-3">
            Войти
        </AtomButtomStandart>
    </form>
</template>

<script setup lang="ts">
import { UserLoginData } from "@/type/index";

const props = defineProps<{
    functionModal?: () => void,
    active?: boolean
}>()


const { createAlert } = useAlert()
const { login: userLogin } = useAuth()
const data = ref<UserLoginData>(createObject())

async function checkValidData(): Promise<void> {
    switch (true) {
        case data.value.username === '' || data.value.password === '':
            createAlert('Проверьте введеные данные')
            break
        default:
            await userLogin(data.value)
            break;
    }
}

function createObject() {
    return {
        username: '',
        password: '',
    }
}


watch(() => props.active, () => {
    data.value = createObject()
})
const style = {
    input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}
</script>
