<template>
  <div>
    <div>
      <OrganismsHeader class="z-20"/>
      <TemplatesPageMainHeader class="z-10"/>
      <div class="container sm:px-4 xs:px-3 px-2 z-10 min-h-screen">
        <NuxtPage :transition="{ name: 'page-transition' }"/>
      </div>
      <OrganismsFooter class="z-20"/>
    </div>
    <Transition name="alert">
      <AtomOtherAlert/>
    </Transition>
    <OrganismsAuth/>
    <OrganismsMenuMobaile class="z-50 sm:hidden"/>
  </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { Cached, Content } from "@/type/index";


const route = useRoute()
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)
const { initAuth } = useAuth()
const _content = useState<Content | null>('CONTENT_APP', () => null)
const headers = useRequestHeaders()

type useAuth = ReturnType<typeof useAuth>
type InitAuthResponse = Cached<useAuth['initAuth']>


onServerPrefetch(async () => {
  const res = await initAuth()
  if (Object.prototype.hasOwnProperty.call(headers, 'accept-language')) {
    const userLocalLanguage = getLanguageUser(headers['accept-language']!)
    const keyContent = userLocalLanguage.find(_ => _[0] !== 'en') || ['en', 0.9]
    const key = keyContent[0].toString()
    try {
      import('@/content/language/ru.js').then(res => _content.value = res.content)
    //   import(`@/content/language/${key || 'ru'}.js`).then(res => {  
    //   if (res && 'content' in res) {
    //     _content.value = res.content
    //     console.log('read content find')
    //   }
    // })
    } catch (error) {
      import('@/content/language/ru.js').then(res => _content.value = res.content)
      console.log('read content catch')
    }  
  } else {
    console.log('other Data')
    import('@/content/language/ru.js').then(res => _content.value = res.content )
    console.log('read content base')
  }
 
  await checkRes(res)
})


async function checkRes(res: InitAuthResponse) {
  if (res) {
    if ('user' in res && res.user) {
      storeUser.update(res.user)
    } else if ('messageKey' in res && res.messageKey && _content.value) {
      console.log(_content.value[res.messageKey as never])
    }
  }
}
// const { initAuth } = useAuth()
// const { isMobile } = useDevice()
// const { windowMask: _windowMask } = useStore()
// const { active, updateMask } = _windowMask()

// onBeforeMount(() => {
//   initAuth()   
// })
</script>

<style lang="css">
@import './assets/css/tailwind.css';
.ap0__mask{
  transition-delay: 0.22s;
  height: 0;
  opacity: 0;
}
.ap0__mask.active{
  height: 100vh;
  transition-delay: 0s;
  opacity: 0.4;
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.25s ease-out;
}

.alert-enter-from,
.alert-leave-to{
  opacity: 0;
  transform: translateY(-20px);
}

.page-transition-enter-active,
.page-transition-leave-active{
  transition: all 0.15s ease-out;
}

.page-transition-enter-from,
.page-transition-leave-to {
  transform: translateX(20px);

  opacity: 0;
}
</style>