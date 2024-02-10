import express from "express";
import {
    admin,
    protect
} from '../middleware/authMiddleware.js'
import {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from "../controllers/order.controllers.js";

const router = express.Router();

router.route('/')
    .get(protect, admin,getOrders)
    .post(protect, addOrderItems);
router.get('/myorders',protect,getMyOrders);
router.get('/:id',protect, admin,getOrderById);
router.put('/:id/pay',protect, updateOrderToPaid);
router.put('/:id/delivered',protect, admin, updateOrderToDelivered);

export default router;