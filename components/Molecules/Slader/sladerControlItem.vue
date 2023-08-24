<template>
    <div >
        <ul :class="[containerClass]"
        ref="ul"
        class="slader-control__items grid grid-flow-col justify-center"
        @click.stop="onClick">
            <li v-for="item in data" :key="item"
                v-bind="{ [dataKey('index')]: (item-1)  }"
                :class="[itemClass]">
                <slot v-bind="{ item, indexActiveButton, ul }">
                    <div :class="['h-4 aspect-square rounded-full mx-2', indexActiveButton === (item-1) ? 'bg-blue-500' : 'bg-blue-100']"></div>
                </slot>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { RecordOption } from '~~/type/index'

// @click="updateScrolLeftSlader(item-1)"
const props = withDefaults(defineProps<{
    indexActiveButton: number,
    updateScrolLeftSlader: (index: number) => void, 
    data: number,
    containerClass?: string,
    itemClass?: string,
}>(), {
    containerClass: 'pt-2',
    itemClass: 'aspect-square',
})

const ul = ref<HTMLUListElement | null>(null)

type DataKey = 'scroll'|'index'
const dataKey =<T extends DataKey>(key:T) => `data-${key}`

function onClick({ target }:MouseEvent) {
    if (ul.value) {
        interface ModifiedHTMLElement extends HTMLElement {
            dataset: DOMStringMap & RecordOption<DataKey, string>
        }
        let _targetElem = target as HTMLElement
        let _liElem = _targetElem.closest(`[${dataKey('index')}]`)
        if (!_liElem) return 
         
        let _elem: ModifiedHTMLElement = _liElem as ModifiedHTMLElement
        let dataIndex: number = +_elem.dataset.index
        let conWid: number = +ul.value.clientWidth.toFixed(0),
            conSc: number = +ul.value.scrollWidth.toFixed(0),
            valChild: number = ul.value.childElementCount,
            widEl: number = +(conSc / valChild).toFixed(0)
        
            if (conWid < conSc && valChild > 3 && dataIndex >= 2) {
                ul.value.scrollTo({ left: (dataIndex - 2) * widEl, top: 0, behavior: 'smooth' })
            }
        props.updateScrolLeftSlader(dataIndex)
    }
}

</script>

<style lang="css">
.slader-control__items{
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

.slader-control__items::-webkit-scrollbar {
    display: none;
}
</style>