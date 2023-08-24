<template>
    <div class="fixed top-0 left-0 w-full bg-black-700 z-50 app-mask" :class="[{ active: state }]"
      @click="clickFun(false)">
        <slot></slot>
      </div> 
</template>

<script setup lang="ts">
interface Props {
    state: boolean,
    clickFun: (...arg: any) => any
}
const props = defineProps<Props>()
const { isDesktop, isFirefox } = useDevice();

watch(() => props.state, (newV) =>{
  if (newV) {
    document.body.style.overflow = 'hidden'
    if (isDesktop && !isFirefox) {
      const screnH = document.body.scrollHeight
      const scrollH = document.body.offsetHeight
      if (screnH !== scrollH) {
        document.body.style.paddingRight = '16px'
      }
    }
  } else {
    setTimeout(() => {  
      document.body.style.overflow = 'auto'
      if (isDesktop && !isFirefox) {
        document.body.style.paddingRight = '0'
      }
    }, 300)
  }
})
</script>

<style lang="css">
.app-mask {
  transition-delay: 0.22s;
  height: 0;
  opacity: 0;
}

.app-mask.active {
  height: 100vh;
  transition-delay: 0s;
  opacity: 100%;
  background-color: hsla(0 0% 15% / 90%);
}

</style>