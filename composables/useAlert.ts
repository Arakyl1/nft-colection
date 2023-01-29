import { alertContent } from "~~/pinia/alertContent";

export default () => {
    const alert = alertContent()
    const { content, alertActive } = storeToRefs(alert)
    const createAlert = (event:string) => {
        
        alert.updateContent(event)
    }
    return { createAlert, content, alertActive }
}