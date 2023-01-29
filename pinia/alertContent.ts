export const alertContent = defineStore('alertContent', () => {
    const content = ref<string>('')
    const alertActive = ref<boolean>(false)
    
    function updateContent(cont: string) {
        content.value = cont

        setTimeout(() => {
            alertActive.value = true
        }, 500);
        setTimeout(() => {
            alertActive.value = false
        }, 4000);
    }

    return { content, alertActive, updateContent }
})






