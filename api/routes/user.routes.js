import express from "express";
import {
    admin,
    protect
} from '../middleware/authMiddleware.js'
import {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserById,
    deleteUser,
    updateUser,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.route('/')
    .get(protect, admin,getUsers)
    .post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id', protect, admin, updateUser);

export default router;