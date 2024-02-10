import asyncHandler from "../middleware/asyncHandler.js"
import Order from "../models/order.model.js"


// @description create a new order
// @route POST /api/orders
// @access Private
export const addOrderItems = asyncHandler(async(req,res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error('Please add at least one order item');
    }else{
        const order = Order.create({
            orderItems: orderItems.map((item)=>({
                ...item,
                product:item._id,
                _id:undefined
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save();

        res
        .status(201)
        .json(createdOrder);
    };
});

// @description Get logged in user's orders
// @route GET /api/orders/myorders
// @access Private
export const getMyOrders = asyncHandler(async(req,res)=>{
   const orders = await Order.find({user:req.user._id});
   res
   .status(200)
   .json(orders); 
});

// @description Get order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = asyncHandler(async(req,res)=>{
    const order = await Order
        .findById(req.params.id)
        .populate('user','name email');

    if(order){
        res
        .status(200)
        .json(order);
    }else{
        res.status(404)
        throw new Error('Order not found');
    }
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
