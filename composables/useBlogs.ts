import { userActive, alertContent } from "~~/pinia/store";

export default () => {
    const updateAlertText = (text: string) => {
        const alert = alertContent()
        alert.updateContent(text)
    }

    const createBlogItem = async (key:string, event:object) => {
        return await useAsyncData(key, () => $fetch('/api/blog/create', {
            method: "POST",
            body: event
        }))
    }
    const getDataByAttrebutes = async (key:string, event:object) => {
        return await useAsyncData(key, () => $fetch('/api/blog/get', {
            method: "POST",
            body: event
        }))
    }
    return { createBlogItem, getDataByAttrebutes }
}