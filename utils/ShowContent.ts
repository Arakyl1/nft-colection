import { windowMask } from "@/pinia/store";

export default function () {
    const stage = ref(false)
    const mask = windowMask()

    function updateStage(e: MouseEventInit | undefined , active: boolean = !stage.value ) { 

        stage.value = active
        mask.updateActive(active)  
    }

    watch(() => useRoute().fullPath, async () => {
        if (stage.value) updateStage(event, false)
    })
    watch(() => mask.active, (newActive) => {
        if (stage.value && !newActive) {
            stage.value = false
        }
    })
    return { stage, updateStage }
}