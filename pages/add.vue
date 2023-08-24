<template>
    <div class="py-8">
        <AtomOtherSectionHeader>
            <template #title>Add NFT</template>
        </AtomOtherSectionHeader>
        <div class="grid lg:grid-cols-3 xl:gap-8 gap-6 mb-12 grid-cols-1">
            <OrganismsFormDoowloadImageSlader @image-data="(e) => { dataImage = e ? e[0] : null }" :multiple="false" />
            <div class="lg:col-start-2 lg:col-end-4">
                <form class="text-right" ref="form">
                    <div class="flex flex-nowrap mb-8 ">
                        <input type="number" required :name="modelProp('NFTCard', 'price')"
                            class="px-4 py-2 text-lg w-full input-1"
                            :placeholder="_content?.CLIENT_NFT_CARD_CREATE_TEXT_PRICE_PLACEHOLDER || 'Specify the price'">

                        <input type="number" required :name="modelProp('NFTCard', 'quantity')"
                            class="px-4 py-2 text-lg w-full input-1 mx-4"
                            :placeholder="_content?.CLIENT_NFT_CARD_CREATE_TEXT_QUANTITY_PLACEHOLDER || 'Specify the quantity'">

                        <div
                            class="input-1 px-12 bg-rose-500 cursor-pointer flex items-center justify-center overflow-hidden">
                            <select ref="select" :name="modelProp('NFTCard', 'currency')" required
                                class="bg-rose-500 border-outline-none text-white text-lg p-1 cursor-pointer">
                                <option>Sel.</option>
                                <option v-for="item in currency" :key="item">{{ item }}</option>
                            </select>
                        </div>

                    </div>
                    <div class="flex input-1 overflow-hidden mb-8">
                        <input type="text" v-model.trim="attributeInput"
                            class="px-4 py-2 text-lg w-full border-outline-none"
                            :placeholder="_content?.CLIENT_NFT_CARD_CREATE_TEXT_ADD_ATTRIBUTE || 'Add attribute'"
                            @keyup.enter="addAttributes">
                        <AtomButtonStandart @click="addAttributes" class="rounded-none bg-rose-500 text-white w-32 p-0">
                            Add
                        </AtomButtonStandart>
                    </div>
                    <div>
                        <ul class="flex flex-wrap" @click.stop="removeAttribute">
                            <li v-for="(item, i) in attributes" :key="item" :data-attr-index="i"
                                class="px-4 flex flex-wrap items-center">
                                <p class="text-xl text-stone-700 pr-1" @click.stop>{{ item }}</p>
                                <CreateIcon name="close_14_14" :att="{ class: 'fill-red-500' }" />
                            </li>
                        </ul>
                    </div>
                    <AtomButtonStandart @click="createCard" class="button-1 bg-rose-500 text-white text-lg px-20 py-2">
                        Create
                    </AtomButtonStandart>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { user as _user } from "@/stores/user";
import { alert as _alert } from "@/stores/alert";
import { Content, RecordOption, getModelName } from "type";
import { Currency } from "@prisma/client";
import { INIT_MODEL_DATA } from "@/server/utils/other";
import CreateIcon from "@/content/icons/create";

useHead({
    title: 'Add page'
})

const _content = useState<Content>('CONTENT_APP')
const storeUser = _user()
const { data: _userData } = storeToRefs(storeUser)
const storeAlert = _alert()
const form = ref<HTMLFormElement | null>(null)
const dataImage = ref<{ link: string, main: boolean } | null>(null)
const attributeInput = ref<string | null>(null)
const attributes = ref<string[]>([])

const currency: Currency[] = ['BTS', 'ETH', 'USD']
const MODEL_DATA = INIT_MODEL_DATA<getModelName<'NFTCard'>>(
    'NFTCard',
    ['attributes', 'author', 'colection', 'reviews'],
    ['createAt'],
    ['id', 'price', 'quantity'],
    ['img'],
    ['attributes', 'author', 'colection', 'createAt', 'currency', 'id', 'img', 'price', 'quantity', 'reviews']
)

function addAttributes() {
    if (attributeInput.value) {
        attributes.value.push(attributeInput.value)
        attributeInput.value = null
    }
}

function removeAttribute({ target, type }: MouseEvent) {
    if (attributes.value.length) {
        interface ModifiedHTMLElement extends HTMLElement {
            dataset: DOMStringMap & RecordOption<'attrIndex', string>
        }
        const _elem = (target as HTMLElement).closest('[data-attr-index]') as ModifiedHTMLElement
        if (_elem) {
            const valueIndex = _elem.dataset.attrIndex
            if (isNumeric(valueIndex)) {
                const valueIndexNum = parseInt(valueIndex)
                attributes.value = attributes.value.filter((_, i) => i !== valueIndexNum)
            }
        }
    }
}

async function createCard() {
    if (form.value) {
        if (!_userData.value) {
            return storeAlert.create({ 'text': _content.value?.CLIENT_NFT_CARD_CREATE_ERROR_USER_IS_NOT_LOGGED_IN || 'The user is not logged in', state: 'info' })
        }

        if (!form.value.checkValidity()) {
            return storeAlert.create({ 'text': _content.value?.CLIENT_NFT_CARD_CREATE_ERROR_INVALID_DATA || `Check the entered data`, 'state': 'info' })
        }

        if (!dataImage.value) {
            return storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_DOOWLOAD_PHOTO || null, state: 'info' })
        } else {
            if (!dataImage.value.main === true) {
                return storeAlert.create({ text: _content.value?.ALERT_PRODUCT_CREATE_SELECT_MAIN_PHOTO || null, state: 'info' })
            }
        }

        type MODEL_KEY = typeof MODEL_DATA['propElem'][0] | typeof MODEL_DATA['propRelation'][0]
        const sendData: { [P in MODEL_KEY]?: any } = {
            img: dataImage.value.link,
            author: _userData.value.id,
            attributes: attributes.value.length ? attributes.value.join(';') : undefined
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
        try {
            await useFetch('/api/nftCard/create', {
                method: 'POST',
                body: { ...sendData },
                onResponse({ response }) {
                    if (response.status < 400) {
                        if ('messageKey' in response._data && response._data.messageKey) {
                            storeAlert.create({ text: response._data.messageKey || null, 'state': 'error' })
                        } else {
                            storeAlert.create({ text: _content.value?.CLIENT_NFT_CARD_CREATE_SUCCESS_TEXT_ALERT || null, 'state': 'success' })
                            form.value!.reset()
                            dataImage.value = null
                            attributes.value = []
                        }
                    } else {
                        storeAlert.create({ text: _content.value?.CLIENT_NFT_CARD_CREATE_ERROR_ALERT || null, 'state': 'error' })
                    }
                },

            })
        } catch (error) {

        }
    }
}

</script>