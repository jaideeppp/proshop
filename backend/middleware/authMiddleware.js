import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';

export const protect = asyncHandler(async (req, res, next) => {
    //1. Check, There is token present or not 
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token);
    }
    //2. If Token Not present return error
    if (!token) {
        res.status(401)
        throw new Error("Please login first")
    }

    //3. If Token present Check Token is correct or not 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');

        next();
    } catch (error) {
        res.status(401)
        throw new Error("User Does not exist")
    }

})


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}
