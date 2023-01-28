<template>
    <div>
        <form class="text-center">
            <input
            type="text"
            :class="style.input"
            placeholder="Логин"
            class="mb-6"
            autocomplete="on"
            v-model="data.username"
          />
          <input
            type="email"
            :class="[style.input,
               { 'focus-visible:outline-red-500 outline-red-500' : !emailValid }
            ]"
            class="mb-6"
            placeholder="Email"
            v-model="data.email"
          />
          <input
            type="password"
            :class="[style.input, [ !passwordValid ? 'bg-rose-200': 'bg-indigo-300']]"
            class="mb-1"
            placeholder="Пароль"
            autocomplete="on"
            v-model="data.password"
          />
          <label class="text-xs text-white mb-4 block">Используйте цифры, буквы малые и прописные, спец. сим.</label>
          <input
            type="password"
            class="mb-8 "
            :class="style.input"
            placeholder="Повторите пароль"
            autocomplete="on"
            v-model="data.repeartPassword"
          />
          <UIButtomStan
          @click="createUser"
          class="bg-rose-500 rounded-full text-lg text-white w-full py-3">
            Зарегистрироватьца
          </UIButtomStan>
        </form>
    </div>
</template>
<script setup lang="ts">
import { alertContent } from "@/pinia/store";
interface DataUser {
    username: string,
    email: string,
    password: string,
    repeartPassword: string
}

const props = withDefaults(defineProps<{ active: boolean}>(), { active: false })

const data = ref<DataUser>(createObject())
const { register } = useAuth()
const alertContentFun = alertContent()

const emailValid = computed(() => {
    return !!data.value.email.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g)
})

const passwordValid = computed(() => {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/g.test(data.value.password)
})

async function createUser() {
  if (emailValid.value) {
    if (passwordValid.value) {
      const res = await register(JSON.stringify(data.value))
      if (res) data.value = createObject()
    } else {
      alertContentFun.updateContent('Пароль слишком прост')
    }
  } else {
    alertContentFun.updateContent('Некорректный адрес почты')
  }
  
}

watch(() => props.active, () => {
    data.value = createObject()
})

function createObject() {
    return {
      username: '',
        email: '',
        password: '',
        repeartPassword: ''
    }
}
const style = {
    input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}
</script>
