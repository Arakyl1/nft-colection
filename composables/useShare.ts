export default () => {
    const copyLink = async () => {
        const permissionToUseClipboard = await navigator.permissions.query({ name: "clipboard-write" })
        if (permissionToUseClipboard.state === "granted" || permissionToUseClipboard.state === "prompt") {
            navigator.clipboard.writeText(window.location.href)
        }
    }
    return { copyLink }
}
