<template>
    <div>
        <form>
            <input type="text" :class="style.input" placeholder="Логин" class="mb-4" autocomplete="on"
                v-model="data.username" />
            <AtomUIEmail @input-email="(e) => { data.email = e}" placeholder="Email" :class="[style.input]" class="mb-4"/>
            <AtomUIPassword @password="(e) => { data.password = e} " placeholder="Пароль" :class="[style.input]" />
            <label class="text-xs text-white mb-2 block">Используйте цифры, буквы малые и прописные, спец. сим.</label>
            <input type="password" class="mb-8 " :class="style.input" placeholder="Повторите пароль" autocomplete="on"
                v-model="data.repeartPassword"/>
    
                    <AtomButtomStandart @click="userRegister()"
                        class="bg-rose-500 rounded-full text-lg text-white w-full py-3">
                        Зарегистрироватьца
                    </AtomButtomStandart>
        </form>
    </div>
</template>

<script setup lang="ts">

import { UserRegisterData } from "@/type/index";

type PartialNull<T> = { [P in keyof T]: T[P] | null; }

const props = withDefaults(defineProps<{ active?: boolean }>(), { active: false })
  
const data = ref<PartialNull<UserRegisterData>>(createObject())
const { createAlert } = useAlert()
const { register: _userRegister } = useAuth()


async function userRegister() {
    const resValidData = checkValidData(unref(data.value))
    
    if (resValidData) {
      const res = await _userRegister(data.value as UserRegisterData) || false
      if (res) {
        createAlert('Пользователь зарегистрирован')
        data.value = createObject()
      }
    }
  }

function checkValidData(data: PartialNull<UserRegisterData>): true | void {
    switch (true) {
      case !data.username:
        return createAlert('Некорретное имя')
      case !data.email:
        return createAlert('Некорректный адрес почты')
      case !data.password:
        return createAlert('Введите пароль')
      case !data.repeartPassword:
        return createAlert('Повторите пароль')
      case data.password !== data.repeartPassword:
        return createAlert('Пароли не совпадают')
      default:
        break
    }
    return true
  }

watch(() => props.active, () => {
  data.value = createObject()
})

const style = {
    input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}


function createObject() {
  return {
    username: '',
    email: '',
    password: '',
    repeartPassword: ''
  }
}
</script>

