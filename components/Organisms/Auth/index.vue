<template>
    <AtomModalMask :state="state" :clickFun="update">
        <AtomModalTransition class="h-min sm:w-[450px] w-[calc(100vw-2rem)]" :state="state">
            <div class="bg-white py-6 px-6 rounded-md w-full h-full
            sm:py-10 sm:px-10">
                <template v-if="_userData">
                    <MoleculesAuthMain />
                </template>

                <template v-else>
                    <MoleculesAuthLogin v-if="modalLogin" @response="onResponse" :reset="reset"/>
                    <MoleculesAuthRegister v-else @response="onResponse" />
                    <div class="decor-line mt-4 mb-3"></div>
                    <p class="text-center text-blue-500 cursor-pointer" @click="modalLogin = !modalLogin"
                    >{{ 
                    _content ? (!modalLogin ? _content.AUTH_TEXT_SPAN_REGISTER : _content.AUTH_TEXT_SPAN_LOGIN) :
                    (!modalLogin ? 'Register' : 'Log in') }}</p>
                </template>
            </div>
        </AtomModalTransition>
    </AtomModalMask>
</template>
<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { Content, ResponseAuthUser } from "@/type/index";
import localState from "@/utils/localState";
import { alert as _alert } from "@/stores/alert";

const _content = useState<Content | null>('CONTENT_APP')
const { state, update } = localState()
const modalLogin = ref<boolean>(true)
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)
const reset = ref<boolean>(false)
const storeAlert = _alert()


function onResponse(_e: ResponseAuthUser) {
    if (_e) {
        if ('messageKey' in _e && _e.messageKey) {
            storeAlert.create({ text: _content[_e.messageKey as never] || null, state: 'error' })
            return
        }
        if ('user' in _e && _e.user) {
            reset.value = !reset.value
            storeUser.update(_e.user)
        }
        if ('access_token' in _e && _e.access_token) {
            // storeToken.update(_e.access_token)
        }
    }
}

onBeforeMount(() => {
    window.addEventListener('create-user',() => update(true))
})

</script>
