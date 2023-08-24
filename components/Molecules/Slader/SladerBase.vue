<template>
    <div class="w-full">
        <div>
            <div>
                <slot name="header" v-bind="{
                    prevItem,
                    nextItem,
                    indexActiveButton,
                    updateScrolLeftSlader,
                    sladerValueScroll }"></slot>
            </div>
            <div ref="slader"
                class="basic__slader slader__container"
                :class="[containerClass]" @scroll.stop="onScroll"
                @pointerdown.stop.passive="onPointerDown"
                @pointerup.stop.passive="onPointerUp"
                @pointerleave.stop.passive="onPointerLeave"
                @dragstart.stop.prevent>
                    <div v-for="(elem,index) in sladerData" :key="index" class="slader__item">
                        <slot name="item" v-bind="{
                            elem,
                            index,
                            prevItem,
                            nextItem,
                            indexActiveButton,
                            updateScrolLeftSlader,
                            sladerValueScroll }"></slot>
                    </div>
            </div>
            <div>
                <slot name="bottom" v-bind="{
                    prevItem,
                    nextItem,
                    indexActiveButton,
                    updateScrolLeftSlader,
                    sladerValueScroll }"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts" generic="T extends any">
import { sladerValueScroll } from "./type";
interface Props {
    data: T[] | null,
    containerClass?: string
}
const props = withDefaults(defineProps<Props>(), {
    containerClass: '[grid-auto-columns:calc(100%)]'
})

const slader = ref<HTMLElement | null>(null)
const indexActiveButton = ref<number>(0)
const cordsScroll = ref<{ startX: number, startSx: number, difX: number, active: boolean } | null>(null)
const sladerData = computed<(T)[]>(() => props.data ? props.data : [...Array(8)])
const buttonAcitive = ref<boolean>(false)
const isScrolling = ref()
const sladerValueScroll = ref<sladerValueScroll>({ current: 0, max: 0 })

function prevItem(): void {
    if (!slader.value) return
    slader.value.scrollBy({ left: -slader.value.clientWidth })
}
function nextItem(): void {
    if (!slader.value) return
    slader.value.scrollBy({ left: slader.value.clientWidth })
}

function updateScrolLeftSlader(index: number): void {
    if (!slader.value) return
    slader.value.scrollLeft = Math.ceil(slader.value.clientWidth * index)
}

function onScroll(e: Event): void {
    if (slader.value && e.type === 'scroll') {
        let scrollLe = parseInt(slader.value.scrollLeft.toFixed(0))
        let clientW = +slader.value.clientWidth.toFixed(0)
        indexActiveButton.value = Math.round(+(scrollLe / clientW))
        sladerValueScroll.value.current = scrollLe
        // 
        window.clearTimeout(isScrolling.value)
        isScrolling.value = setTimeout(() => {
            if (!buttonAcitive.value && slader.value) {
                slader.value.style.setProperty('scroll-snap-type', 'x mandatory')
            }
        }, 400)
    }
}

function onPointerDown({ clientX, type, pointerId, pointerType, target }: PointerEvent) {
    if (slader.value && type === 'pointerdown' && pointerType === 'mouse') {
        //slader.value.setPointerCapture(pointerId)
        cordsScroll.value = { startX: clientX, startSx: slader.value.scrollLeft, difX: 0, active: true }
        slader.value.style.setProperty('scroll-snap-type', 'none')
        slader.value.style.setProperty('scroll-behavior', 'auto')
        document.body.style.setProperty('cursor', 'all-scroll')
        slader.value.onpointermove = onPointerMove
        buttonAcitive.value = true
    }
}

function onPointerMove({ clientX, buttons, type, pointerId, pointerType }: PointerEvent) {
    if (type === 'pointermove' && pointerType === 'mouse') {
        if (cordsScroll.value && cordsScroll.value.active && slader.value && buttons !== 0) {
            let difX = cordsScroll.value.startX - clientX
            cordsScroll.value.startX = clientX
            slader.value.scrollLeft += difX
        } else {
            resetScrollData(pointerId, slader.value)
            cordsScroll.value = null
        }
    }
}

function onPointerUp({ type, pointerId, pointerType }: PointerEvent) {
    if (type === 'pointerup' && pointerType === 'mouse') {
        resetScrollData(pointerId, slader.value)
        cordsScroll.value = null
    }
}

function onPointerLeave({ type, pointerId, pointerType }: PointerEvent) {
    if (type === 'pointerleave' && pointerType === 'mouse') {
        resetScrollData(pointerId, slader.value)
        cordsScroll.value = null
    }
}

function resetScrollData(pointerId: number, elem: HTMLElement | null) {
    if (elem) {
        elem.style.setProperty('scroll-behavior', 'smooth')
        let widthCols: string = window.getComputedStyle(elem).getPropertyValue('grid-auto-columns')
        let sladerScrollLeft = elem.scrollLeft
        let sladerCotainerWIdth = elem.clientWidth
        let difScrollComplet: number = Number((sladerScrollLeft / (sladerCotainerWIdth / (100 / parseFloat(widthCols)))).toFixed(2));
        if (!Number.isInteger(difScrollComplet)) {
            let valueScroll = (Math.round(difScrollComplet) * (sladerCotainerWIdth / (100 / parseFloat(widthCols)))) - sladerScrollLeft
            elem.scrollBy({ left: valueScroll, behavior: 'smooth' })
        }
        // slader.value.releasePointerCapture(pointerId)
        elem.onpointermove = null
        document.body.style.setProperty('cursor', 'auto')
        buttonAcitive.value = false
    }
}

function valueScroll(elem: HTMLElement | null): number | void {
    if (elem) {
        let c = elem.clientWidth,
            o = elem.offsetWidth,
            s = elem.scrollWidth
        let scrollWidth = Math.max(c,o,s)
        return scrollWidth - c
    }
}
function getValueScroll() {
    sladerValueScroll.value.max = valueScroll(slader.value) || 0
}

onMounted(() => {
    getValueScroll()
    window.addEventListener('resize', getValueScroll, { passive: true })
})
onUpdated(() => {
    getValueScroll() 
})

onBeforeMount(() => window.removeEventListener('resize', getValueScroll))
</script>

<style lang="css">
.basic__slader {
    display: grid;
    grid-auto-flow: column;
    overflow-x: scroll;
    overscroll-behavior-inline: contain;
    scroll-snap-type: x mandatory;
    transition: all cubic-bezier(0.333, 0.5, 0.65, 1) 0.6s;
    scrollbar-width: none;
    scroll-behavior: smooth;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.basic__slader::-webkit-scrollbar {
    display: none;
}
</style>
