<template>
  <div>
    <form class="text-center" ref="form">
      <!-- <h3 class="text-3xl text-center font-medium text-black-500 mb-7">{{ _content?.AUTH_TEXT_TITLE_REGISTER || 'Register'}}</h3> -->
      <input type="text" :class="style.input" :placeholder="_content?.AUTH_TEXT_PLACEHOLDER_USERNAME || 'Username'" class="mb-4" required
        aria-required="true" autocomplete="username" v-model="data.username" />
      <AtomFormEmail :placeholder="_content?.AUTH_TEXT_PLACEHOLDER_EMAIL || 'Email'" class="text-lg w-full mb-4 px-4 py-2 rounded-md"
        aria-required="true" autocomplete="email" required v-model="data.email" />
      <AtomFormPassword :placeholder="_content?.AUTH_TEXT_PLACEHOLDER_PASSWORD || 'Password'" class="text-lg w-full px-4 py-2 rounded-md"
        aria-required="true" autocomplete="new-password" required v-model="data.password" />
      <label class="text-xs text-gray-500 pt-1 pb-2 block">{{ _content?.TEXT_AUTH_REGISTER_PASSWORD_INFO || ''}}</label>
      <AtomFormPassword :placeholder="_content?.AUTH_TEXT_PLACEHOLDER_PASSWORD_D || 'Repeat password'"
        class="text-lg w-full px-4 py-2 rounded-md mb-8" aria-required="true" autocomplete="new-password" required
        v-model="data.repeartPassword" />

      <AtomButtonStandart @click="userRegister()" class="bg-rose-500 rounded-full text-lg text-white w-full py-3">
        {{ _content?.AUTH_TEXT_BUTTOM_REGISTER || "Register" }}
      </AtomButtonStandart>
    </form>
  </div>
</template>
<script setup lang="ts">
import { Content, UserRegisterData, ResponseAuthUser } from "@/type/index";
import { alert as _alert } from "@/stores/alert";

const emit = defineEmits<{
  (e: 'response', value: ResponseAuthUser): void
}>()

type ParticalMY<T> = { [P in keyof T]: T[P] | null; }

const data = ref<ParticalMY<UserRegisterData>>(createObject())
const { register: _register } = useAuth()
const form = ref<HTMLFormElement | null>(null)
const storeAlert = _alert()
const _content = useState<Content>('CONTENT_APP')

async function userRegister() {
  const resValidData = checkValidData(unref(data.value), form.value ? form.value : null)

  if (resValidData) {
    const res = await _register(data.value as UserRegisterData) || false
    if (res) {
      emit('response', res)
      if (_content.value) {
        storeAlert.create({ text: _content.value.ALERT_AUTH_REGISTER_SUCCESS || null, state: 'success' })
      }
      data.value = createObject()
    }
  }
}


function checkValidData<
  T extends HTMLFormElement | null,
  U extends typeof data.value>(data: U, form: T): true | void {
  if (!form || !form.reportValidity()) return
  if (data.password !== data.repeartPassword && _content.value) {
    storeAlert.create({ text: _content.value.ALERT_AUTH_REGISTER_PASSWORD_DONT_MATCH || null, state: 'error' })
    return
  }
  return true
}

// watch(() => props.active, () => {
//   form.value?.reset()
// })

function createObject() {
  return {
    username: null,
    email: null,
    password: null,
    repeartPassword: null
  }
}
const style = {
  input: 'text-lg w-full rounded-full px-5 py-2 focus-visible:outline-0 focus-visible:ring-0 transition'
}
</script>
