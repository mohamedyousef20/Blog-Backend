import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import error from './error.js';
import User from '../model/UserModel.js';



// create token 
export const createToken = (id, isAdmin) => {
    const token = jwt.sign(
        
        { id: id, isAdmin: isAdmin },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRE_DATE }
    )
    return token;
}

// verify token
export const verifyToken = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(" ")[1];
        // console.log('token')
        // console.log(token)
    }
    if (!token) {
        return next(new error('User Access Denied , Login Again'))
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    // find current user


    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new error('No Logged User Found'))
    }

    req.user = currentUser;  // make new object in request

    next();

}

// >>>>##@@TO DO AFTER MAKE FILTRATION ON API FEATURE <<<<<<<<<<<<<<<<<<
// export const filterObjForLoggedUser = asyncHandler(async (req, res, next) => {

//     if (req.user.role === "user") {
//         req.filterObj = { user: req.user._id };
//     }
//     next();
// });

// AND MAKE LOGGED USER TO FILTER

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// verify role 
export const verifyRole = (...role) => {
    return asyncHandler(async (req, res, next) => {
        console.log(role)
        console.log(req.user.role)

        if (!role.includes(req.user.role)) {
            return next(new error("You Do Not Allowed To Access", 403));
        }
        next();
    });
};

