import { v2 as cloudinary } from 'cloudinary'
import formidable, { type Fields, type Files } from 'formidable';

const uploadImageCloudinary = async (file: string, folderName: string) => {
    return await cloudinary.uploader.upload(file, {
        height: 800,
        width: 800,
        crop: "fit",
        fetch_format: "webp",
        folder: folderName || 'test',
        uploadPreset: 'your-upload-preset',
    })
}

const addImageCloud = async (filepath: string, num: number, folderName: string): Promise<
    { url: string, secretUrl: string } | null
> => {
    try {
        if (num <= 5) {
            const uploadImage = await uploadImageCloudinary(filepath, folderName)
            return {
                url: uploadImage.url,
                secretUrl: uploadImage.secure_url,
            }
        } else {
            return null
        }
    } catch (error) {
        return addImageCloud(filepath, ++num, folderName)
    }
}

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    cloudinary.config({
        cloud_name: config.cloudinaryName,
        api_key: config.cloudinaryApiKey,
        api_secret: config.cloudinaryApiSecret,
    })

    const params = getQuery(event)
    let response : { url: string; secretUrl: string } | null = null
    if ('type' in params && params.type === 'File') {
        const form = formidable({})
        const { fields, files }: { fields: Fields, files: Files } = await new Promise(
            (resolse, reject) => {
                form.parse(event.req, (err, fields, files) => {
                    if (err) reject(err)
                    resolse({ fields, files })
                })
            })

        const _file = Array.isArray(files.file) ? files.file[0] : files.file
        return await addImageCloud(_file.filepath, 0, config.cloudinaryFolderName)
    } else if ('type' in params && params.type === 'String') {
        const body = await readBody<{ link: string }>(event)
        console.log(body)
        return await addImageCloud(body.link, 0, config.cloudinaryFolderName)
    }
    
})