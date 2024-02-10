import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/order.model.js"


// @description create a new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async(req,res)=>{
    res.send('add order items')
    });

// @description Get logged in user's orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async(req,res)=>{
    res.send('get my orders')
    });

// @description Get order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async(req,res)=>{
    res.send('get order by id')
    });

// @description Update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = asyncHandler(async(req,res)=>{
    res.send('update order to paid')
    });

// @description Update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/admin
export const updateOrderToDelivered = asyncHandler(async(req,res)=>{
    res.send('update order to delivered')
    });

// @description Get all orders
// @route GET /api/orders
// @access Private/Admin
export const getOrders= asyncHandler(async(req,res)=>{
    res.send('Get all orders')
    });
