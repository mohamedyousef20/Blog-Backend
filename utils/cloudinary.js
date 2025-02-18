import cloudinary from 'cloudinary'
import asyncHandler from 'express-async-handler';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
});

export const uploadToCloudinary = asyncHandler(async (fileToUpload) => {

    const result = await cloudinary.uploader.upload(fileToUpload, (error, result) => {
        if (error) {
            console.error(error)
        } else {
            const public_id = result.public_id;
            const secure_url = result.secure_url;
        }
    }
    )
    return result;
});



// delete an image in cloudinary

export const removeFromCloudinary = asyncHandler(async (imagePublicId) => {


    const data = await cloudinary.UploadStream.destroy(imagePublicId);
    console.log('Image Deleted Successfully From Cloudinary')
    return data;
})
