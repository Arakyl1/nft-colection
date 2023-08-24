<template>
    <div>
        <section class="mb-16">
            <AtomOtherSectionHeader>
                <template #title>Add an article</template>
            </AtomOtherSectionHeader>
            <div class="grid lg:grid-cols-3 xl:gap-8 gap-6 mb-12 grid-cols-1">
                <OrganismsFormDoowloadImageSlader @image-data="(e) => { dataImage = e ? e : null }" :multiple="true"/>
                <div class="lg:col-start-2 lg:col-end-4">
                    <form class="flex flex-col h-full" ref="form">
                        <template v-for="item in dataCreate">
                            <template v-if="!Array.isArray(item)">
                                <template v-if="item.tag === 'input'">
                                    <AtomFormText v-if="item.type === 'text'" :name="item.name"
                                        :placeholder="item.placeholder" class="input-1 text-lg px-4 py-2 mb-6" />
                                </template>
                                <template v-else-if="item.tag === 'textarea'">
                                    <textarea :name="item.name" class="input-1 text-lg px-4 py-2"
                                        :placeholder="item.placeholder"></textarea>
                                </template>
                            </template>
                        </template>
                    </form>
                </div>
            </div>
            <div class="text-right">
                <AtomButtonStandart class="button-1 bg-rose-500 text-white px-20 md:text-xl xs:text-lg md:py-3 py-2"
                    @click="createBlogCard">Add article
                </AtomButtonStandart>
            </div>
            <div>

            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";
import { Content, getModelName } from "@/type/index";
import { INIT_MODEL_DATA } from "@/server/utils/other";

useHead({
    title: 'Blog page'
})

const _content = useState<Content>('CONTENT_APP')
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)
const storeAlert = _alert()
const form = ref<HTMLFormElement | null>(null)
const dataImage = ref<{ link: string, main: boolean }[] | null>(null)
const MODEL_DATA = INIT_MODEL_DATA<getModelName<'BlogCard'>>(
    'BlogCard',
    ['attributes', 'author', 'image', 'reviews'],
    ['createAt'],
    ['authorId', 'id'],
    ['text', 'title'],
    ['authorId', 'createAt', 'id', 'text', 'title']
)


async function createBlogCard() {
    if (form.value) {
        if (!_userData.value) {
            return storeAlert.create({ 'text': _content.value?.CLIENT_BLOG_CREATE_ERROR_USER_IS_NOT_LOGGED_IN || 'The user is not logged in', state: 'info' })
        }
        if (!form.value.checkValidity()) {
            return storeAlert.create({ 'text': _content.value?.CLIENT_BLOG_CREATE_ERROR_INVALID_DATA || `Check the entered data`, 'state': 'info' })
        }
        type MODEL_KEY = typeof MODEL_DATA['propElem'][0] | typeof MODEL_DATA['propRelation'][0]
        const sendData: { [P in MODEL_KEY]?: any } = {
            image: dataImage.value,
            author: _userData.value.id
        }
        const formData = new FormData(form.value)
        for (const [key, value] of formData) {
            if (MODEL_DATA.propElem.includes(key as never)) {
                switch (true) {
                    case MODEL_DATA.propInt.includes(key as never): {
                        if (isNumeric(value as never)) {
                            sendData[key as MODEL_KEY] = parseFloat(value as never)
                        } else {
                            storeAlert.create({ 'text': `Invalid value ${value}, expected number`, 'state': 'info' })
                        }
                        break;
                    }
                    default: {
                        sendData[key as MODEL_KEY] = value
                        break;
                    }
                }
            } else {
                storeAlert.create({ 'text': `Unknow key ${key}`, 'state': 'info' })
            }
        }

        if (!dataImage.value) {
            return storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_DOOWLOAD_PHOTO || null, state: 'info' })
        } else {
            if (!dataImage.value.find(_ => _.main === true)) {
                return storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_SELECT_MAIN_PHOTO || null, state: 'info' })
            }
        }
        

        try {
            await useFetch('/api/blog/create', {
                method: 'POST',
                body: { ...sendData },
                onResponse({ response }) {
                    if (response.status < 400) {
                        storeAlert.create({ text: _content.value?.ALERT_BLOG_TEXT_CREATE_SUCCESS || null, 'state': 'success' })
                        form.value!.reset()
                        dataImage.value = null
                    } else {
                        storeAlert.create({ text: _content.value?.ALERT_BLOG_TEXT_CREATE_ERROR || null, 'state': 'error' })
                    }
                }
            })
        } catch (error) {
            storeAlert.create({ text: _content.value?.ALERT_BLOG_TEXT_CREATE_ERROR || null, 'state': 'error' })
        }
    } else {

    }
}



interface Model {
    tag: 'input' | 'textarea',
    type?: 'text' | 'number',
    placeholder: string,
    name: string
    arrt?: {
        min?: number,
        max?: number,
        step?: number,
        maxlength?: number,
        minlength?: number
    }
}

const dataCreate: (Model | Model[])[] = [
    {
        tag: 'input',
        type: 'text',
        placeholder: 'Заголовок',
        name: modelProp('BlogCard', 'title')
    },
    {
        tag: 'textarea',
        placeholder: 'Текс статьи',
        name: modelProp('BlogCard', 'text')
    }
]
</script>