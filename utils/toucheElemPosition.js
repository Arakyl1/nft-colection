import { onBeforeUnmount, onMounted, reactive } from 'vue'

export function toucheElemPosition (elem) {
  const _elem = ref(elem)
  const touchStartPos = reactive({ x: null, y: null, started: false, vector: null })
  const onToucheStart = (e) => {
    touchStartPos.x = e.touches[0].clientX
    touchStartPos.y = e.touches[0].clientY
    touchStartPos.started = true
    touchStartPos.vector = null
    // e.preventDefault()
  }
  const onToucheMove = (e) => {
    if (!touchStartPos.started) {
      return
    }
    
    const dx = e.changedTouches[0].clientX - touchStartPos.x
    const absDx = Math.abs(dx)
    const dy = e.changedTouches[0].clientY - touchStartPos.y
    const absDy = Math.abs(dy)
    if (Math.max(absDx, absDy) > 5) {
      touchStartPos.vector = (absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 4))
      // touchStartPos.started = false
    }
  }
  const onTouchEnd = (e) => {
    touchStartPos.started = false
  }

  function addHandler (elem) {
    if (elem) { 
      elem.addEventListener('touchstart', onToucheStart, { passive: true })
      elem.addEventListener('touchmove', onToucheMove, { passive: true })
      elem.addEventListener('touchend', onTouchEnd, false)
    }
  }

  function removeHandler (elem) {
    if (elem) { 
      elem?.removeEventListener('touchstart', onToucheStart, { passive: true })
      elem?.removeEventListener('touchmove', onToucheMove, { passive: true })
      elem?.removeEventListener('touchend', onTouchEnd, false)
    }
  }

  onMounted(() => addHandler(unref(elem)))
  onBeforeUnmount(() => removeHandler(unref(elem)))
  watch(() => _elem.value, (newV) => {
    if (newV) { addHandler(unref(elem)) }
  })
  return touchStartPos
}
