import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        viewBox: '0 0 35.4 36.8',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M17.6,18.7c4.6,0,8.3-3.7,8.3-8.3C26,5.7,22.2,2,17.6,2s-8.3,3.7-8.3,8.3C9.3,14.9,13,18.7,17.6,18.7z',
            class: 'group-[.is-icon-black]:stroke-stone-900 group-[.is-icon-white]:stroke-white fill-none stroke-[3]'
        }),
        h('path', {
          'd': 'M32,35.3c0-6.5-6.4-11.7-14.3-11.7S3.3,28.9,3.3,35.3',
          class: 'group-[.is-icon-black]:stroke-stone-900 group-[.is-icon-white]:stroke-white fill-none stroke-[3]'
      }),
    ])
}

