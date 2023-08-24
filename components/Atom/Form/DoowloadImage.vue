<template>
    <div>
        <form @click="input?.click()">
            <input
            type="file"
            accept="image/png, image/jpeg, image/webp" ref="input"
            hidden
            :multiple="multiple"
                @change="onChange($event)">
            <div v-if="!inputImage">
                <slot>
                </slot>
            </div>
            <div v-else class="aspect-square">
                <img :src="inputImage" alt="" class="max-w-full max-h-full object-cover ">
            </div>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ResponseDownloadImage } from '~~/type/index'

const props = withDefaults(defineProps<{
    multiple?: boolean,
    inputImage?: string | null
}>(), {
    multiple: false,
    inputImage: null
})
const emit = defineEmits<{
    (e: 'linkImg', value: (ResponseDownloadImage)[]): void
}>()

const input = ref<HTMLInputElement | null>(null)
const { doowload } = useImage()

async function onChange({ target }: Event) {
    const _target = target as unknown as HTMLInputElement
    if (!_target.files) return
    const res = await doowload(_target.files)
    if (res && res.length) {
       emit('linkImg', res)
    }
}

</script>