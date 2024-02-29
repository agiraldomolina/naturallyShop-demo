import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/product.routes.js';
import userRoutes from './routes/user.routes.js';
import orderRoutes from './routes/order.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const port=process.env.PORT || 8000;

connectDB();

const app=express();

// Body parser middleware to get data form the body
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Cookie parser middleware to get data from cookies
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send('API is working');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal',(req,res)=>
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
);

const __dirname = path.resolve();  // set __dirname to current working directory
app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    // set static folder to /frontend/dist
    app.use(express.static(path.join(__dirname, '/client/dist')));

    // any route that is not api will go to index.html
    app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
);
}

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})