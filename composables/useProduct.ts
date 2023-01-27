import { userActive, accessToken, alertContent } from "~~/pinia/store";

export default () => {
    const updateAlertText = (text: string) => {
        const alert = alertContent()
        alert.updateContent(text)
    }

   const getUserInfoForCard = async (event: object) => {
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

   const getNFTCardBySelecCat = async(event: object, name: string) => {
        try {
            return await useAsyncData(name, () => $fetch('/api/product/cardNFT', {
                method: "POST",
                body: event
            })) 
            // if ('statusCode' in data) {
            //     throw createError({
            //         statusCode: data.statusCode,
            //         statusMessage: data.statusMessage
            //     })
            // }
        } catch (error) {
            console.error(error);
        }
   }

   const createCardNFT = async (event: object) => {
    try {
        const data = await $fetch('/api/product/create', {
            method: 'POST',
            body: event
        })
        if ('statusCode' in data) {
            throw createError({
                statusCode: data.statusCode,
                statusMessage: data.statusMessage
            })
        }
        updateAlertText('Товар добавлен')
        return data
    } catch (error) {
        console.error(error);
    }
   }
   return { getUserInfoForCard, getNFTCardBySelecCat, createCardNFT }
}