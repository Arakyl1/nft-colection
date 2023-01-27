<template>
<div>
    <slot>
        <form @click="input?.click()">
            <input type="file" accept="image/png, image/jpeg" ref="input" hidden @change="imageChange">
            <div v-if="!inputImage"
                class="aspect-square border border-rose-600 border-double bg-purple-200 rounded-3xl flex justify-center items-center">
                <p class="text-xl text-stone-700 font-medium">Кликните, чтобы добавить фото</p>
            </div>
            <div v-else>
                <img :src="inputImage" alt="">
            </div>
        </form>
    </slot>
</div>

</template>
<script setup lang="ts">
const props = withDefaults(defineProps<{reset: boolean}>(), { reset: false })
const emit = defineEmits<{
    (e:'linkImg', value: string):void
}>()

const input = ref<HTMLElement | null>(null)
const inputImage = ref<string | ArrayBuffer | null | undefined>(null)

async function imageChange(event: any) {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
        inputImage.value = event.target?.result
    }
    reader.readAsDataURL(file)

    const image = await useFetch('/api/cloudinari/upload', {
        method: "POST",
        body: file,
        headers: {
            "Content-Type": "application/octet-stream"
        }
    })
    if (image.data.value) {
        emit('linkImg', image.data.value[0].secretUrl)
    }
}

watch(() => props.reset, () => { inputImage.value = '' })
</script>