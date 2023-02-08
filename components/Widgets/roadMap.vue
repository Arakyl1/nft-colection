<template>
    <section class=" overflow-hidden">
        <slot name="title"></slot>
        <div>
            <div>
                <div v-for="item in itemList" :key="item.id" class="lg:mb-4">
                    <div ref="element" :data-index="item.id" class="">
                        <div class="hidden lg:block" v-if="!isMobile">
                            <div v-show="item.active" class="h-full flex" :class="[{ 'flex-row-reverse': item.left }]">
                                <div class="w-5/12 xl:pb-8 pb-4">
                                    <Transition name="show-item"
                                        :enter-from-class="!item.left ? 'show-item-left' : 'show-item-rigth'"
                                        :leave-to-class="item.left ? 'show-item-left' : 'show-item-rigth'">
                                        <div v-show="item.active" class="p-6 shadow"
                                            :class="[{ 'text-right': !item.left }]">
                                            <h3 class="test-xl font-bold mb-2">{{ item.title }}</h3>
                                            <p class="mb-3">{{ item.text }}</p>
                                            <SharedButtomBase
                                                class="border-rose-500 border-2 text-rose-500 font-medium uppercase xl:py-2 px-6 py-1 text-sm xl:text-base">
                                                read more
                                            </SharedButtomBase>
                                        </div>
                                    </Transition>
                                </div>
                                <div class="w-2/12 relative ">
                                    <div class="flex justify-center items-center z-10 relative"
                                        :class="[{ 'flex-row-reverse': !item.left }]">
                                        <Transition name="show-text">
                                            <div v-show="item.active" class="w-5/12">
                                                <p class="[white-space:nowrap]"
                                                    :class="[item.left ? '-translate-x-4' : 'translate-x-4']">{{
                                                        transformDate(item.date)
                                                    }}</p>
                                            </div>

                                        </Transition>
                                        <Transition name="show-icon">
                                            <div class="w-2/12 aspect-square" v-show="item.active">
                                                <div class="h-full rounded-full border-rose-500
                                            flex justify-center items-center border bg-white">
                                                    <img src="@/assets/img/svg/icon/bts.svg" alt="c">
                                                </div>
                                            </div>
                                        </Transition>
                                        <Transition name="fade">
                                            <div class="w-5/12 h-2 bg-gray-200 duration-700 delay-1000 transition-all"
                                                v-show="item.active"
                                                :class="[item.left ? 'origin-left' : 'origin-right']">
                                            </div>
                                        </Transition>
                                    </div>
                                    <div class="absolute top-[10%] w-2 h-full bg-gray-200 left-1/2 -translate-x-1/2 z-0 origin-top transition-all"
                                        :class="[item.id !== itemList.length && itemList[item.id].active ? 'scale-100' : 'scale-y-0']">
                                    </div>
                                </div>
                                <div class="w-5/12"></div>
                            </div>
                        </div>
                        <div class="lg:hidden" v-if="isMobile">
                            <div class="flex">
                                <div class="w-1/4 relative">
                                    <div class="flex justify-center items-center z-10 relative translate-y-6">
                                        <Transition name="show-text">
                                            <div v-show="item.active" class="sm:text-right sm:px-4 sm:text-base w-3/12 rotate-90
                                             translate-y-4 text-xs origin-bottom-left z-0">
                                                <p class="[white-space:nowrap]">{{ transformDate(item.date) }}</p>
                                            </div>
                                        </Transition>
                                        <Transition name="show-icon">
                                            <div class="w-3/12 aspect-square z-10" v-show="item.active">
                                                <div class="h-full rounded-full border-rose-500
                                            flex justify-center items-center border bg-white sm:scale-100 scale-125">
                                                    <img src="@/assets/img/svg/icon/bts.svg" alt="c">
                                                </div>
                                            </div>
                                        </Transition>
                                        <Transition name="fade">
                                            <div class="w-6/12 h-2 bg-gray-200 duration-700 delay-1000 transition-all z-0"
                                                v-show="item.active">
                                            </div>
                                        </Transition>
                                    </div>
                                    <div class="absolute top-[25%] w-2 h-full bg-gray-200 left-1/3 z-0 origin-top transition-all"
                                        :class="[item.id !== itemList.length && itemList[item.id].active ? 'scale-100' : 'scale-y-0']">
                                    </div>
                                </div>
                                <div class="w-3/4 pb-8">

                                    <Transition name="show-item" enter-from-class="show-item-rigth"
                                        leave-to-class="show-item-rigth" class="lg:hidden">
                                        <div v-show="item.active" class="sm:p-6 p-4 shadow">
                                            <h3 class="sm:test-xl xs:text-lg text-base font-bold xs:mb-2 mb-1">{{
                                                item.title
                                            }}</h3>
                                            <p class="mb-3 xs:text-base text-xs">{{ item.text }}</p>
                                            <SharedButtomBase class="border-rose-500 xs:border-2 border text-rose-500 font-medium
                                            uppercase xl:py-2 px-6 py-1 xl:text-base xs:text-sm text-xs">
                                                read more
                                            </SharedButtomBase>
                                        </div>
                                    </Transition>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

interface Item {
    id: number,
    active: boolean,
    title: string,
    left: boolean,
    text: string,
    date: string
}

const { isMobile } = useDevice()
const element = ref<HTMLElement[] | null>(null)

const itemList = reactive<Item[]>([
    { id: 1, active: false, left: true, title: 'ICO Conducting', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 2, active: false, left: false, title: 'Legal Reviewng', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 3, active: false, left: true, title: 'Trade Enquiries', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 4, active: false, left: false, title: 'Platform Idea', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 5, active: false, left: true, title: 'Project Idea', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
    { id: 6, active: false, left: false, title: 'Token Sale', text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Natoque viverra eget.', date: 'Sun Feb 01 2023 19:43:20 GMT+0300' },
])


onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entrie => {
            const indexItem = entrie.target.dataset.index
            if (indexItem && entrie.isIntersecting) {
                itemList[+indexItem - 1].active = true
            }
        })

    }, {
        root: null,
        threshold: 1,
    })
    if (element.value) element.value.forEach(elem => observer.observe(elem));
})

onBeforeUnmount(() => {
    if (element.value) element.value?.forEach(elem => new IntersectionObserver().unobserve(elem))
})

</script>

<style lang="css">
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
    transition-delay: 400ms;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleX(0);
}

.show-icon-enter-active,
.show-icon-leave-active {
    transition: all 0.2s ease;
    transition-delay: 200ms;
}

.show-icon-enter-from,
.show-icon-leave-to {
    opacity: 0;
    transform: scale(0);
}

.show-text-enter-active,
.show-text-leave-active {
    transition: all 0.6s ease;
    transition-delay: 300ms;
}

.show-text-enter-from,
.show-text-leave-to {
    opacity: 0;
}

.show-item-enter-active,
.show-item-leave-active {
    transition: all 0.2s ease;
    transition-delay: 500ms;
}

.show-item-left {
    transition: all 0.2s ease;
    opacity: 0;
    transform: translateX(-40px);
}

.show-item-rigth {
    transition: all 0.2s ease;
    opacity: 0;
    transform: translateX(40px);
}
</style>