<template>
    <form>
        <input type="text" :class="style.input" class="mb-4" placeholder="Логин" v-model="data.username" />
        <input type="password" :class="style.input" class="mb-8" placeholder="Пароль" autocomplete="on"
            v-model="data.password" />
        <SharedApiAuthLogin @login-user="(e) => { reset = e }">
            <template #default="{ loginUser }">
                <UIButtomStan @click="checkValidData(loginUser)" class="bg-rose-500 rounded-full text-lg text-white w-full py-3">
                    Войти
                </UIButtomStan>
            </template>
        </SharedApiAuthLogin>

    </form>
</template>

<script setup lang="ts">
interface DataUser {
    username: string,
    password: string,
}

const props = defineProps<{
    functionModal?: Function,
    active?: boolean
}>()
const { createAlert } = useAlert()
const data = ref<DataUser>(createObject())
const reset = ref<boolean | null>(null)

function createObject() {
    return {
        username: '',
        password: '',
    }
}

async function checkValidData(functionLogin: any) {
    switch (true) {
        case data.value.username === '' || data.value.password === '':
            return createAlert('Проверьте введеные данные')
        default:
            await functionLogin(data.value)
            break;
    }
}

watch(() => props.active, () => {
    data.value = createObject()
})
const style = {
    input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}
</script>props.functionModal()