<template>
    <div class="flex" @click.stop="addNumberStar">
        <slot name="input">
            <input type="number" hidden :name="inputName" v-model.number="starValue" ref="input">
        </slot>
        <slot v-bind="{ starValue }">
            <CreateIcon v-for="item in 5" :key="item" :name="name" class="item__star"
                :att="{ class: starValue && starValue >= item ? style.active : style.deactive + ' stroke-stone-500' }" :data-star="item" />
        </slot>
    </div>
</template>

<script setup lang="ts">
import { default as CreateIcon, type NameIcon } from "@/content/icons/create";
import { RecordOption } from '~~/type/index';


const props = withDefaults(defineProps<{
    quantityStar?: number | undefined
    style?: { base?: string, active: string, deactive: string },
    inputName?: string,
    watchReset?: boolean
    name?: `${NameIcon}_${number}_${number}`
}>(), {
    style() {
        return {
            active: 'stait-active--fill',
            deactive: 'stait-deactive--fill'
        }
    },
    name: 'star-2_18_18',
    inputkey: '_',
    watchReset: false
})

const emit = defineEmits<{
    (e: 'numberStar', id: number): void
}>()


const starValue = ref<number | undefined>(undefined)
const input = ref<HTMLInputElement | null>(null)

onBeforeMount(() => {
    
    if (isNumber(props.quantityStar) && props.quantityStar != starValue.value) {
        starValue.value = props.quantityStar
        console.log(starValue.value)
    }
})


onMounted(() => {
    console.log(props.quantityStar, starValue.value)
    window.addEventListener('init-active-params', initParams)
    if (props.watchReset) {
        window.addEventListener('reset', resetForm)
    }

})
onUnmounted(() => {
    window.removeEventListener('init-active-params', initParams)
    if (props.watchReset) {
        window.removeEventListener('reset', resetForm)
    }
})


type DatasetKey = 'star'
function addNumberStar({ target }: MouseEvent): void {
    interface ModifiedHTMLElement extends HTMLElement {
        dataset: DOMStringMap & RecordOption<DatasetKey, string>
    }
    const elementTarget = target as HTMLElement
    const element = elementTarget.closest('.item__star') as ModifiedHTMLElement
    const number: number = +element.dataset.star
    if (number) {
        starValue.value = number
        emit('numberStar', number)
        setTimeout(() => {
            if (input.value) {
                input.value.dispatchEvent(new Event('input', { bubbles: true }))
            }
        }, 0);
    }
}

function resetForm() {
    starValue.value = undefined
}
function initParams() {
    if (input.value) {
        const value = input.value.value
        if (value && starValue.value?.toString() !== value) {
            starValue.value = parseInt(value)
        }
    }
}
</script>