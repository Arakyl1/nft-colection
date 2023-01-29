<template>
  <transition name="modal" class="ot1e1">
    <div class="fixed inset-1/2 origin-center -translate-y-2/4 -translate-x-2/4 text-left modal" v-show="active" >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ active: boolean }>(), { active: false })
</script>

<style lang="css">
.modal{
    opacity: 1;
    transition: all ease-in 0.25s;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from.ot1e1,
.modal-leave-to.ot1e1{
  transform: translate(-50%, -50%) scale(1.05);
}
</style>