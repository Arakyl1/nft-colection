<template>
    <div class="text-center">
        <p class="text-rose-600 font-medium">
            <slot name="top"></slot>
        </p>
        <h2 class="2xl:text-[40px] xl:text-4xl sm:text-3xl text-2xl font-bold text-slate-800 py-4 group-[.title-color-purple]:text-purple-600">
            <slot name="title">Title</slot>
            <span class="text-rose-500 underline decoration-rose-500 sm:underline-offset-[12px] underline-offset-8">
                <slot name="title-span"></slot>
            </span>
        </h2>
        <p class="text-slate-800 2xl:px-40 xl:px-32 lg:px-24 md:px-16 md:text-lg text-sm">
            <slot name="bottom"></slot>
        </p>
    </div>
</template>
