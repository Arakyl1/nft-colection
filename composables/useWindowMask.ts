import { windowMask } from "@/pinia/windowMask";

export default () => {
    const windowMaskFun = windowMask()
    const { active } = storeToRefs(windowMaskFun)

    function updateMask(value:boolean) {
        windowMaskFun.updateActive(value)
    }
    return { active, updateMask }
}