<template>
    <section>
        <slot name="title"></slot>
        <div>
            <div class="flex flex-nowrap">
                <div class="w-1/2 ">
                    <img src="@/assets/img/png/main/other.png" alt="">
                </div>
                <div class="w-1/2 py-20 pl-4">
                    <p class="mb-6">
                        Written in. This book is a treatise on the theory of ethics
                        very popular during the Renaissance.The first line of
                        Lorem Ipsum, "Lorem ipsum dolor sit amet
                    </p>
                    <p class="mb-6">
                        The generated Lorem Ipsum is therefore always free from
                        repetition, injected humour, or non-characteristic
                        words etc
                    </p>
                    <ul class="mb-6">
                        <li v-for="(item, index) in list" :key="index" class="mb-4">
                           <span class="w-2 h-2 bg-rose-500 inline-block mr-2"></span> {{  item }}
                        </li>
                    </ul>
                    <SharedButtomBase class="bg-rose-500 text-white px-8 py-2 text-lg">
                        Read More
                    </SharedButtomBase>
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