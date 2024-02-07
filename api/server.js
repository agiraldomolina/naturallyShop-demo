import express from 'express';
import dotenv from 'dotenv';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const port=process.env.PORT || 5000;

connectDB();

const app=express();

// Body parser middleware to get data form the body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('API is working');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})