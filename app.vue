<template>
  <div>
    <div
    class="fixed top-0 left-0 w-full bg-stone-900 z-30 ap0__mask"
    :class="[{ active: active }]"
    @click="updateMask(false)"></div>
    <div>
      <WidgetsTheHeader class="z-20"/>
      <WidgetsMainHeader class="z-10"/>
      <div class="container sm:px-4 xs:px-3 px-2 z-10">
        <NuxtPage/>
      </div>
      <WidgetsTheFotter class="z-20"/>
    </div>
    <Transition name="alert">
      <EntitiesAlert/>
    </Transition>
    <WidgetsModalUser/>
    <EntitiesHeaderMenuMobaile class="z-50" v-if="isMobile"/>
  </div>
</template>

<script setup lang="ts">
const { initAuth } = useAuth()
const { isMobile } = useDevice()
const { active, updateMask } = useWindowMask()

onBeforeMount(() => {
  initAuth()   
})
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