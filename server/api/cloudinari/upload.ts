import { uploadImageCloudinary } from "@/server/utils/cloudibary";
import formidable from 'formidable';

const addImageCloud = async (key: any, obj: any) => {
    
    const file = obj[key].filepath
    const uploadImage = await uploadImageCloudinary(file)
    const data = {
        url: uploadImage.url,
        secretUrl: uploadImage.secure_url,
    }
    return data
}

export default defineEventHandler(async(event) => {
    
    const form = formidable({})
    
    const response  = await new Promise((resolse, reject) => {
        
        form.parse(event.req, (err, fields, files) => {
            if (err) {
                reject(err)
            }
            resolse({ fields, files })
        })
    })
    
    const { field, files } = response

    

    let addFiles: Promise<{
        url: string;
        secretUrl: string;
    } | "Error">[] = Object.keys(files).map(async(key)=> {
            try {
              return await addImageCloud(key, files)
            } catch {
              return "Error"
            }
        })
    const data = await Promise.all(addFiles)
   
    return data
})