import jwt from 'jsonwebtoken';
import asyncHandler from "./asyncHandler.js";
import User from "../models/user.model.js";

export const protect = asyncHandler(async(req,res,next)=>{
    let token;
    
    // Read the JWT from cookie
    token = req.cookies.jwt;  // jwt is the name of the cookie craeted in the user controller
    console.log(token);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user =  await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not autthorized, token failed');
        }
    }else{
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

// Admin middleware

export const admin = asyncHandler(async(req,res,next)=>{
    if (req.user &&  req.user.isAdmin) {
        next();
    }else{
        res.status(401);
        throw new Error('Not authorized, user is not admin');
    }
});