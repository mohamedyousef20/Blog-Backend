import mongoose from "mongoose";


const CategorySchema = mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


}, { timestamps: true });



export default mongoose.model('Category', CategorySchema)