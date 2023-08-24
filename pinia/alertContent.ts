export type notificationOption = { time: number, disappearance: boolean }

export const alertContent = defineStore('alertContent', (option?: notificationOption) => {
    const content = ref<string>('')
    const alertActive = ref<boolean>()

    const { time: time, disappearance: disappearance = true } = option || {}
    
    function updateContent(cont: string) {
        content.value = cont

        if (!disappearance) return
        setTimeout(() => {
            alertActive.value = true
        }, 500);
        setTimeout(() => {
            alertActive.value = false
        }, time ? time : 4000);
    }


    return { content, alertActive, updateContent }
})





