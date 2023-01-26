<template>
  <div>
    <div
    class="fixed top-0 left-0 w-full bg-stone-900 z-30 ap0__mask"
    :class="[{ active: active }]"
    @click="windowMaskFun.updateActive(false)"></div>
    <div>
      <Header/>
      <div class="max-w-7xl mx-auto px-4">
        <NuxtPage/>
      </div>
      <Footer/>
    </div>
    <Transition name="alert">
      <OtherElseAlert/>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { windowMask, userActive } from "@/pinia/store";

const windowMaskFun = windowMask()
const userActiveFun = userActive()
const { active } = storeToRefs(windowMaskFun)
const { userData} = storeToRefs(userActiveFun)
const route = useRoute()
const { initAuth } = useAuth()

onBeforeMount(() => { initAuth()})
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
</style>