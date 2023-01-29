<template>
    <div>
        <section class="mb-16">
            <SharedSectionHeader>
                <template #title>Add an article</template>
            </SharedSectionHeader>
            <div class="grid grid-cols-3 gap-8 mb-12">
                <div>
                    <OtherElseDownloadImg :reset="reset" @link-img="(e) => { blogData.img = e }" />
                </div>
                <div class="col-start-2 col-end-4">
                    <form class="flex flex-col h-full">
                        <input type="text" class="px-5 py-3 text-xl w-full focus-visible:outline-0
                        border border-rose-500 rounded-full mb-6 text-gray-700" v-model="blogData.title"
                            placeholder="Заголовок">
                        <div class="grow">

                            <textarea v-model="blogData.text"
                                class=" border border-rose-500 rounded-2xl w-full h-full px-8 py-4 focus-within:outline-0 text-xl text-gray-600"
                                placeholder="Текс статьи"></textarea>
                        </div>
                    </form>
                </div>
            </div>
            <div class="text-right">
                <UIButtomStan class="bg-rose-500 text-white text-2xl rounded-full px-20" @click="createBlogArticle">
                    Add article
                </UIButtomStan>
            </div>
            <div>

            </div>
        </section>

    </div>
</template>

<script setup lang="ts">
const { createAlert } = useAlert()
const { userData } = useStoreUser()
const reset = ref<boolean>(false)

const blogData = ref(createBlogData())

const validParams = computed(() => Object.values(blogData.value).findIndex(el => el === '' || el <= 0)
)
async function createBlogArticle() {
    if (userData.value) {
        blogData.value.authorId = userData.value.id
        if (validParams.value === -1) {
            const { data, error } = await blogCreateItem(`createblogItem_${Date.now()}`, { data: blogData.value })
            if (!error.value) {
                blogData.value = createBlogData()
                resetImage()
                createAlert('Статья опубликована')
            } else {
                createAlert('Возникла ошибка при отправке данных')
            }
        } else {
            createAlert('Не все заполнены поля')
        }
    } else {
        createAlert('Чтобы добавить товар, авторизуйтесь')
    }
}
const resetImage = () => reset.value = !reset.value
</script>