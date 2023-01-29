<template>
<form>
    <input
      type="text"
      :class="style.input"
      class="mb-6"
      placeholder="Логин"
      v-model="data.username"
    />
    <input
      type="password"
      :class="style.input"
      class="mb-6"
      placeholder="Пароль"
      autocomplete="on"
      v-model="data.password"
    />
    <UIButtomStan
    @click="loginUser"
    class="bg-rose-500 rounded-full text-lg text-white w-full py-3">
        Войти
    </UIButtomStan>
</form>
</template>

<script setup lang="ts">
interface DataUser {
    username: string,
    password: string,
}

const props = defineProps<{
    functionModal: Function,
    active: boolean
}>()
const { createAlert } = useAlert()


const data = ref<DataUser>(createObject())

function createObject() {
    return {
        username: '',
        password: '',
    }
}

async function loginUser() {
    if (data.value.username && data.value.password) {
        try {
            const res = await userLogin(data.value)
            if (res) {
                props.functionModal()
            }
        } catch (error) {
            console.log(error);
        }
        return
    }
    createAlert('Проверьте введеные данные')
}

watch(() => props.active, () => {
    data.value = createObject()
})
const style = {
    input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}
</script>