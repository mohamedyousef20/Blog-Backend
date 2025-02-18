import mongoose, { model } from "mongoose";
import bcrypt from 'bcryptjs'
import path from "path";
import Post from "./PostModel.js";
import Comment from "./CommentModel.js";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'name is required'],
        minlength: [3, 'too short'],
        maxlength: [14, 'too long']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is not required'],
        unique: [true, 'email is not unique'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is not required'],
        minlength: [8, 'too short'],
    },

    profileImage: {

        type: Object,
        default: {
            url: '',
            publicId: null
        }
    },
    bio: {
        type: String,
    },

    role: {
        type: String,
        enum: ['user','admin'],
        default: "user"
    },
    accountIsVerified: {
        type: Boolean,
        default: false
    }

},

    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }

    })

UserSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField: '_id'
})




UserSchema.pre('save', async function (next) {
    console.log('hashed')
    this.password = await bcrypt.hash(this.password, 10);
    next()
});



UserSchema.pre('save', async function (next) {
    this.profileImage.url = ''
    this.profileImage.publicId = ''
    next()
})



// deleting related post and comments
UserSchema.pre('deleteOne', { document: true, query: true }, async function (next) {
    // delete all posts from DB
    await Post.deleteMany({ user: this._id })

    // get user  comments
    await Comment.deleteMany({ user: this._id });

    /////////////////////////////////////
    // to do
    // get public id from the image posts :to remove from cloudinary
    // delete user posts images from cloudinary
    // delete user profile image from cloudinary 
    /////////////////////////////////////
    console.log('deleting related Posts ')
    next();
})


export default mongoose.model("User", UserSchema)