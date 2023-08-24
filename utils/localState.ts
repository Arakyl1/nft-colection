
export default function localState(opt: { watch?: boolean } = { watch: true }) {
    const state = ref<boolean>(false)

    const update = (active: boolean) => {
        if (typeof active === 'boolean') {
            state.value = active
        }
    }
    if (opt.watch) {   
        watch(() => useRoute().fullPath, () => {
            if (state.value) update(false)
        })
    }

    return { state, update }
}