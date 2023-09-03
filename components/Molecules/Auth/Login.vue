<template>
    <form ref="form">
        <h3 class="text-3xl text-center font-medium text-stone-900 mb-7">{{ _content?.AUTH_TEXT_TITLE_LOGIN || 'Login' }}</h3>
        <input type="text" class="mb-4 input-1 border-stone-900" :placeholder="_content?.AUTH_TEXT_PLACEHOLDER_USERNAME || 'username'"
            :class="style.input" required aria-required="true" autocomplete="username" :name="modelProp('User', 'username')" />
        <AtomFormPassword :placeholder="_content?.AUTH_TEXT_PLACEHOLDER_PASSWORD || 'password'" autocomplete="current-password"
        :class="style.input" class="mb-6" required aria-required="true" :name="modelProp('User', 'password')"/>
        <AtomButtonStandart @click="onClick()" class="bg-rose-500 text-white py-3"
        :class="style.input">{{ _content?.AUTH_TEXT_BUTTOM_LOGIN || 'Login' }} </AtomButtonStandart>
    </form>
</template>

<script setup lang="ts">
import { Content, ResponseAuthUser } from "@/type/index";
import { alert as _alert } from "@/stores/alert";

const emit = defineEmits<{
    (e: 'response', value: ResponseAuthUser): void
}>()

const props = defineProps<{ reset: boolean }>()
const { login: userLogin } = useAuth()
const form = ref<HTMLFormElement | null>(null)
const _content = useState<Content>('CONTENT_APP')
const storeAlert = _alert()

async function onClick() {
    if (form.value) {
        const formData = new FormData(form.value)
        const logunUserData: { [key:string]: any }  = {}

        for (const [key, value] of formData) {
            if (['username','password'].includes(key)) {
                logunUserData[key] = value
            }
        }

        if (form.value.checkValidity() && 'username' in logunUserData && 'password' in logunUserData) {
            const res = await userLogin(logunUserData as { username: string, password: string })
            if (res) {
                emit('response', res)
            }
        } else if(_content.value) {
            storeAlert.create({ text: _content.value.ALERT_AUTH_LOGIN_INVALID_DATA || null, state: 'error' })
        }
    }
}

watch(() => props.reset, () => {
    if (form.value) {
        form.value.reset()
    }
})
const style = {
    input: 'text-lg w-full rounded-full px-4 py-2 transition'
}

</script>