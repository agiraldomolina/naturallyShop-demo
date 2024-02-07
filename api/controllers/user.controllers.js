import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken";



// @desc Register
// @route Post /api/users
// @access Public
export const registerUser = asyncHandler(async(req,res)=>{
    res.send('register user')
})

// @desc login user & get token
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        // Set JWT as HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly:true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite:'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(401);
        throw new Error('Inavlid email or password');
    }
    
})

// @desc Logout user & clear cookie
// @route POST /api/users/logout
// @access Private
export const logoutUser = asyncHandler(async(req,res)=>{
    res.send('logout user')
})

// @desc get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async(req,res)=>{
    res.send('get user profile')
})

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async(req,res)=>{
    res.send('update user profile')
})

// @desc Get users
// @route GET /api/users
// @access Private/admin
export const getUsers = asyncHandler(async(req,res)=>{
    res.send('get users')
})

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/admin
export const getUserById = asyncHandler(async(req,res)=>{
    res.send('get user by id')
})

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/admin
export const deleteUser = asyncHandler(async(req,res)=>{
    res.send('delete  user')
})

// @desc Update user
// @route PUT /api/users/:id
// @access Private/admin
export const updateUser = asyncHandler(async(req,res)=>{
    res.send('update users')
})



