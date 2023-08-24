import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        width: '14',
        height: '14',
        viewBox: '0 0 448 512',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z',
            class: 'group-[.is-icon-blue]:fill-blue-500 group-[.is-icon-white]:fill-white'
        })])
}
