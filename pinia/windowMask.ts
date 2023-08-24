export const windowMask = defineStore('windowMask', () => {
    const active = ref<boolean>(false)

    function updateActive(stage: boolean = !active.value) {
        active.value = stage
    }
    return { active, updateActive }
})