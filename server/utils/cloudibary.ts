import { v2 as cloudinary } from 'cloudinary'

const config = useRuntimeConfig()

cloudinary.config({
    cloud_name: config.cloudinaryName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
})


export const uploadImageCloudinary = async (image: string) => {
    return await cloudinary.uploader.upload(image, {
        height: 800,
        width: 800,
        crop: "fit",
        fetch_format: "webp",
        folder: 'nft-market-place',
        uploadPreset: 'your-upload-preset',
      })
}