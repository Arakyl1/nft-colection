
type mouseCords = {
    x: number,
    y: number,
    clientX: number,
    clientY: number
}
type MouseKey = 'mousedown'|'mouseenter'|'mouseleave'|'mousemove'|'mouseout'|'mouseover'|'mouseup'
export default function useMouse<T extends HTMLElement, U extends MouseKey>(el: T | null, key: U) {
    const mouseCords = reactive<mouseCords>(createBaseCords())
  
    function updateMouseCords(event:MouseEvent) {
        console.log(event);
        
        mouseCords.x = event.pageX
        mouseCords.y = event.pageY
        mouseCords.clientX = event.clientX 
        mouseCords.clientY = event.clientY   
    }

    function createBaseCords() {
        return {
            x: 0,
            y: 0,
            clientX: 0,
            clientY: 0,
        }
    }


    onMounted(() => {console.log(el) })
    onUnmounted(() => (el ? el : window).removeEventListener(key, () => updateMouseCords))

    return { mouseCords }
}
