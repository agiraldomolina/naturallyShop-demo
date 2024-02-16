import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/product.model.js"


// @description fecth all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.json(products);
});

// @description fecth a product
// @route GET /api/products/:id
// @access Public
export const getProductById = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource not found');
    } 
});

// @description Create a  product
// @route POS /api/products
// @access Private/Admin
export const createProduct = asyncHandler(async(req,res)=>{
    const product = new Product({
        name:'sample name',
        price:0,
        stock:req.body.stock,
        user:req.user._id,
        image:'/images/sample.jpg',
        brand:'Sample brand',
        description:'sample description',
        category:'sample category',
        countInStock:0,
        numReviews:0
    })

    const createdProduct = await product.save();

    res
        .status(201)
        .json(createdProduct);
});