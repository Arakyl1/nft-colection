import { h } from "vue";

export default (_props: any) => {
    return h('svg', {
        ..._props,
        width: '24',
        height: '22',
        viewBox: '0 0 24 22',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg'
    }, [
        h('path', {
            'd': 'M14.5601 0.808758C17.5584 0.823356 19.9855 3.25039 20.0001 6.24878C20.0001 11.7421 10.0001 17.1821 10.0001 17.1821C10.0001 17.1821 0.00012207 11.6621 0.00012207 6.24878C0.00012207 3.24436 2.43568 0.808758 5.44014 0.808758C7.27927 0.794415 8.99866 1.71944 10.0001 3.26207C11.0085 1.72695 12.7234 0.804318 14.5601 0.808758Z',
            class: `group-[.icon-rose]:fill-rose-600 group-[.icon-rose]:stroke-rose-600
            group-[.icon-black]:fill-none group-[.icon-black]:stroke-slate-900
            transition-all stroke-2 translate-x-[2px]`
        })])
}
