
import multer from "multer"
import path from "path"
import error from "../utils/error.js"
import sharp from "sharp"
import asyncHandler from 'express-async-handler'
import { uploadToCloudinary } from "../utils/cloudinary.js"





export const uploadOneImage = (fieldName) => {
    // multer disk storage 
    const multerStorage = multer.memoryStorage();

    // insure that file uploaded is image
    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true)
        }
        else {
            cb(new error('Only Images Can Be Upload', 404), false)
        }
    }

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload.single(fieldName)


}
// image processing 
export const imageProcessing = asyncHandler(async (req, res, next) => {
    const fileName = `image-${Math.random(100)}-${Date.now()}.jpeg`
    await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 80 }).toFile(`uploads/${fileName}`);

    // upload images to cloudinary

    // const cloudinary = uploadToCloudinary(`images/${fileName}`);



    next();
})


// ----if you use desk Storage you cant use sharp to image proccessing-----//

// // multer disk storage
// const multerStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images')
//     },
//     filename: function (req, file, cb) {
//         if (file) {
//             cb(null, `image-${Math.random(100)}-${Date.now()}.jpeg`)
//         }
//         else {
//             cb(null, false)
//         }
//     }
// })


// const multerFilter = function (req, file, cb) {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true)
//     }
//     else {
//         cb(new error('Only Images Can Be Upload', 404), false)
//     }
// }



// // const upload = multer({ dest: multerStorage, fileFilter: multerFilter })
// const upload = multer({ storage: multerStorage, fileFilter: multerFilter })

// // return upload.single('profileImage')
