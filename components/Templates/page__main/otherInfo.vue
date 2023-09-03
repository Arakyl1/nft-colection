<template>
    <section>
        <slot name="title"></slot>
        <div>
            <div class="flex lg:flex-nowrap flex-wrap">
                <div class="xl:w-1/2 lg:w-1/3 w-full lg:mb-0 mb-4">
                    <img src="@/assets/img/png/main/other.png" alt="">
                </div>
                <div class="2xl:py-20 xl:py-16 lg:py-12 lg:pl-8 xl:w-1/2 lg:w-2/3 w-full pl-0">
                    <p class="sm:mb-6 mb-4 xs:text-base text-sm">
                        Written in. This book is a treatise on the theory of ethics
                        very popular during the Renaissance.The first line of
                        Lorem Ipsum, "Lorem ipsum dolor sit amet
                    </p>
                    <p class="sm:mb-6 mb-4 xs:text-base text-sm">
                        The generated Lorem Ipsum is therefore always free from
                        repetition, injected humour, or non-characteristic
                        words etc
                    </p>
                    <ul class="sm:mb-6 mb-4">
                        <li v-for="(item, index) in list" :key="index" class="sm:mb-4 mb-2 xs:text-base text-sm">
                           <span class="w-2 h-2 bg-rose-500 inline-block mr-2"></span> {{  item }}
                        </li>
                    </ul>
                    <AtomButtonStandart class="button-1 bg-rose-500 text-white px-8 py-2 text-lg">
                        Read More
                    </AtomButtonStandart>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">

const list: string[] = [
    'Except to obtain some advantage from it?',
    'Nam libero tempore, cum soluta nobis est eligendi optio cumque...',
    'Choice is untrammelled and when nothing prevents our being.',
    'Which is the same as saying through shrinking from toil and pain',
    'Except to obtain some advantage from it?'
]
</script>