import { userActive, accessToken, alertContent } from "~~/pinia/store";

export default () => {
    const updateAlertText = (text: string) => {
        const alert = alertContent()
        alert.updateContent(text)
    }

   const getUserInfoForCard = async (event: Event) => {
        try {
            const data =  await $fetch('/api/product/cardUser', {
                method: "POST",
                body: event
            })
            if ('statusCode' in data) {
                throw createError({
                    statusCode: data.statusCode,
                    statusMessage: data.statusMessage
                })
            }
            return data
        } catch (error) {
            console.error(error);
        }
   }
   return { getUserInfoForCard }
}