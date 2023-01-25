import { v2 as cloudinary } from 'cloudinary'

const cloudinaryPost = () => {
    const config = useRuntimeConfig()

    cloudinary.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret
    })
    return cloudinary
}

export const uploadImageCloudinary = async (image: any) => {
    return await cloudinaryPost().uploader.upload(image, {
        height: 800,
        width: 800,
        crop: "fit",
        fetch_format: "webp",
        folder: 'upload-examples',
        uploadPreset: 'your-upload-preset',
      })
}