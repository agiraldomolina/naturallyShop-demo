import asyncHandler from "../middleware/asyncHandler.js"
import Product from "../models/product.model.js"


// @description fecth all products
// @route GET /api/products
// @access Public
export const getProducts = asyncHandler(async(req,res)=>{
    const pageSize =3;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Product.countDocuments();

    const products = await Product.find({})
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({products,page, pages: Math.ceil(count/pageSize)});
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

// @description Update a  product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = asyncHandler(async(req,res)=>{
    const { 
        name, 
        price, 
        description, 
        image, 
        brand, 
        stock, 
        category, 
        countInStock, 
    } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;
        
        const updatedProduct = await product.save();

        res
         .status(200)
         .json(updatedProduct);
    }else{
        res.status(404)
        throw new Error('Product not found');
    }
});

// @description Delete a  product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
       await Product.deleteOne({_id:product._id});
       res
        .status(200)
        .json({message: 'Product deleted successfully'});

    }else{
        res.status(404)
        throw new Error('Product not found');
    }
});

// @description Create a new review
// @route POS /api/products/:id/reviews
// @access Private
export const createProductReview = asyncHandler(async(req,res)=>{
    const { rating, comment } = req.body;
    
    const product = await Product.findById(req.params.id);

    if(product){
       const alreadyReviewed = product.reviews.find((review)=>
        review.user.toString() === req.user._id.toString())
        
        if(alreadyReviewed){
            res.status(400)
            throw new Error('You have already reviewed this product')
        }

        const review = {
            name:req.user.name,
            rating:Number(rating),
            comment,
            user:req.user._id
        };
        product.reviews.push(review);

        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc,review)=> review.rating + acc,0) / product.reviews.length;

        await product.save();
        res
            .status(201)
            .json({message: 'Review added successfully'});
    }else{
        res.status(404)
        throw new Error('Product not found');
    }
});