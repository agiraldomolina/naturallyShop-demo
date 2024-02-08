import asyncHandler from "../middleware/asyncHandler.js"
import User from "../models/user.model.js"
import { generateToken } from "../utils/generateToken.js";



// @desc Register
// @route Post /api/users
// @access Public
export const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password}= req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({name,email,password});

    if(user){
        generateToken(res, user._id);
        
        res
        .status(201)
        .json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(400);
        throw new Error('Something went wrong');
    }
})

// @desc login user & get token
// @route POST /api/users/login
// @access Public
export const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res, user._id);

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
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    });

    res
    .status(200)
    .json({message: 'Logged out successfully'})
})

// @desc get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async(req,res)=>{
   res.json('get user profile')
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



