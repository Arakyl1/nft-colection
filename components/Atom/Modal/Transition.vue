<template>
  <transition name="modal" appear>
      <div v-show="state" ref="modal" @click.stop 
      class="fixed inset-1/2 origin-center -translate-y-2/4 -translate-x-2/4 text-left z-50 modal" :class="[addclass]">
        <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    state: boolean,
    draggable?: boolean,
    addclass?: string
   }>(), {
    draggable: false })

const modal = ref<HTMLElement | null>(null)

const elementSize = reactive({
  startX: 0,
  startY: 0,
  x: 0,
  y: 0
})


type cords = { x: number, y: number}
function updatePositionElement<T extends HTMLElement>(el:T, cords: cords) {
  let elH: number = el.clientHeight
  let elW: number = el.clientWidth
  let wX: number = window.innerWidth
  let wY: number = window.innerHeight  

  el.style.top = ((elH + cords.y - elH/2) > wY-15) || ((cords.y - elH/2) < 15 ) ? el.style.top : cords.y + 'px'
  el.style.left = ((elW + cords.x - elW/2) > wX-15) || ((cords.x - elW/2) < 15) ? el.style.left : cords.x + 'px'
}

function onPointerDown({ pointerId, clientX, clientY, button }:PointerEvent) {
  if (button !== 2) return

  elementSize.startX = clientX
  elementSize.startY = clientY
  if (modal.value) {
    modal.value.onpointermove = onPointerMove
    modal.value.setPointerCapture(pointerId)

    const { x, y, height, width } = modal.value.getBoundingClientRect()
    elementSize.x = x + width/2
    elementSize.y = y + height/2
  }
}

function onPointerMove({clientX, clientY}:PointerEvent) {
  const difX = elementSize.startX - clientX
  const difY = elementSize.startY - clientY
  elementSize.startX = clientX
  elementSize.startY = clientY
  elementSize.x -= difX
  elementSize.y -= difY

  if (modal.value) {
    const cords = { x: elementSize.x, y: elementSize.y}
    updatePositionElement(modal.value, cords)
    document.body.style.cursor = 'move'
  }

}

function onPoinerUp({pointerId}:PointerEvent) {
  if (modal.value) {
    modal.value.onpointermove = null
    modal.value.releasePointerCapture(pointerId)
  }
  document.body.style.cursor = ''
}

onMounted(() => {
  if (props.draggable && modal.value) {
    modal.value.onpointerdown = onPointerDown
    modal.value.onpointerup = onPoinerUp
  }
})
</script>

<style lang="css">
.modal-leave-to,
.modal-enter-from {
  opacity: 0;
  transition: all 0.3s ease;
}

.modal-enter-from > *,
.modal-leave-to > * {
  transform: scale(1.05);
  transition: all 0.3s ease;
}
</style>