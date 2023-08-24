<template>
    <div>
        <MoleculesSladerBase v-if="dataImage" :data="dataImage" @change.stop="toDoImageMain">
            <template #item="{ elem, index }">
                <div class="flex justify-center items-center w-full relative aspect-square">
                    <div class="absolute top-8 right-8">
                        <AtomButtonStandart class="after:content-none p-0.5 border border-gray-500"
                            @click.stop="removeItem(index)">
                            <CreateIcon name="close_20_20" :att="{ class: 'fill-gray-500' }" />
                        </AtomButtonStandart>
                    </div>
                    <img :src="changeValueImageSize(elem.link, { 'heigth': 'h_480' })" alt="Фото товар"
                        class="max-w-[80%] max-h-[80%]">
                    <div class="absolute bottom-4 right-4 translate-y-1/2">
                        <div class="flex items-center">
                            <Transition name="path">
                                <div v-if="indexMainImage === -1">
                                    <p class="text-white truncate bg-yellow-500 py-0 px-2 rounded-md mr-4 text-sm">
                                        {{ _content?.CLIENT_FORM_DOOWLOAD_IMAGE_SELECT_MAIN_PHOTO || 'Choose the main image'
                                        }}
                                    </p>
                                </div>
                            </Transition>
                            <input type="checkbox" class="w-6 h-6 cursor-pointer rounded-md"
                                v-bind="{ 'data-index': index }" :checked="index === indexMainImage">
                        </div>
                    </div>
                </div>
            </template>
            <template #bottom="{ updateScrolLeftSlader, indexActiveButton }" v-if="dataImage && dataImage.length > 1">
                <MoleculesSladerControlItem :data="dataImage.length" :index-active-button="indexActiveButton"
                    :update-scrol-left-slader="updateScrolLeftSlader"
                    :item-class="'aspect-square mx-2 flex-1 max-w-[3rem] max-h-[3rem]'">
                    <template #default="{ item }">
                        <div>
                            <div class="border-2 rounded-lg transition p-0.5 aspect-square flex justify-center items-center"
                                :class="[(item - 1) === indexActiveButton ? 'border-yellow-500 ' : 'border-blue-300']">
                                <img :src="changeValueImageSize(dataImage[(item - 1)].link, { 'heigth': 'h_48' })" alt=""
                                    class="rounded-md max-h-[95%] max-w-[95%]">
                            </div>
                        </div>
                    </template>
                </MoleculesSladerControlItem>
            </template>
        </MoleculesSladerBase>
        <AtomFormDoowloadImage @link-img="(e) => { dataImage = e.map(_ => ({ link: _.url, main: false })) }"
            :multiple="multiple" v-else>
            <div class="input-1 border-[1.5px] border-dashed aspect-square bg-purple-200 flex justify-center items-center">
                <p class="text-xl text-gray-700 font-medium">{{ _content?.CLIENT_FORM_DOOWLOAD_IMAGE_TEXT || 'Click to add a photo' }}</p>
            </div>
        </AtomFormDoowloadImage>
    </div>
</template>
<script setup lang="ts">
import { Content, RecordOption } from 'type';
import CreateIcon from "@/content/icons/create";

const props = withDefaults(defineProps<{ multiple:boolean }>(), { multiple: false })

type IMAGE_DATA = { link: string, main: boolean }
const emit = defineEmits<{
    (e: 'image-data', data: IMAGE_DATA[]): void
}>()

const _content = useState<Content>('CONTENT_APP')

const dataImage = ref<IMAGE_DATA[] | null>(null)
const indexMainImage = ref<number>(-1)

function removeItem(index: number) {
    if (dataImage.value && props.multiple) {
        dataImage.value = dataImage.value.filter((_, i) => i !== index)
        emit('image-data', dataImage.value)
    }
}

function toDoImageMain({ target, type, }: Event) {
    if (type === 'change' && dataImage.value &&
        (target as HTMLElement).tagName === 'INPUT') {

        interface ModifiedHTMLElement extends HTMLInputElement {
            dataset: DOMStringMap & RecordOption<'index', string>
        }
        let elem = target as ModifiedHTMLElement
        let valueIndex: number = +elem.dataset.index
        let valueChecked: boolean = elem.checked

        if (valueIndex !== -1) {
            dataImage.value = dataImage.value.map((_, i) => i === valueIndex ?
                ({ ..._, main: true }) : ({ ..._, main: false }))
            indexMainImage.value = valueChecked ? valueIndex : -1
            emit('image-data', dataImage.value)
        }
    }

}

function resetData() {
    dataImage.value = null
    indexMainImage.value = -1
}

onMounted(() => window.addEventListener('reset', resetData))
onUnmounted(() => window.removeEventListener('reset', resetData))
</script>
