import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        width: '25',
        height: '25',
        viewBox: '0 0 25 25',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M3.125 4.16669H21.875V6.25002H3.125V4.16669ZM3.125 11.4584H21.875V13.5417H3.125V11.4584ZM3.125 18.75H21.875V20.8334H3.125V18.75Z',
            class: 'group-[.is-icon-black]:fill-stone-900 group-[.is-icon-white]:fill-white'
        })])
}
