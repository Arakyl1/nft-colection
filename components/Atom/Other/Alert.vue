<template>
    <div class="fixed z-[999] top-3 right-3 max-w-[50%] xl:max-w-[75%] md:max-w-[100%]">
        <ClientOnly>
            <TransitionGroup tag="ul" name="list" @click.stop="onClick">
                <template v-for="item in alertData" :key="item.createAt">
                    <li
                    class="mb-2 flex justify-end"
                    :data-alert-id="item.createAt">
                    <div class="alert-model-1 sm:text-sm whitespace-nowrap" :class="[
                        item.state === 'base' ? 'text-rose-100 bg-indigo-600' :
                        item.state === 'error' ? 'bg-red-500 text-white' :
                        item.state === 'success' ? 'bg-green-600 text-white' :
                        item.state === 'info' ? 'bg-yellow-500 text-white' : ''
                    ]"
                        :style="{ '--tw-bg-opacity': (item.state === 'base' || item.state === 'error') ? 0.55 : item.state === 'info' ? 0.85 : 0.75 }">
                        <p class="text-inherit">{{ item.text }}</p>
                    </div>
                </li>
            </template>
            </TransitionGroup>
        </ClientOnly>
    </div>
</template>

<script setup lang="ts">
import { alert as _alert } from "@/stores/alert";

const storeAlert = _alert()
const { data: alertData } = storeToRefs(storeAlert)

function onClick({ target }: MouseEvent) {
    const _target = target as HTMLElement
    const elemList = _target.closest('[data-alert-id]')
    if (elemList) {
        const valueAlertId = parseInt((elemList as HTMLLIElement).dataset.alertId || '')
        if (valueAlertId) {
            storeAlert.removeItem(valueAlertId)
        }
    }
}
</script>

<style lang="css">
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
</style>