import  express  from "express";
import {protect, admin } from "../middleware/authMiddleware.js";
import { 
    getProducts, 
    getProductById,
    createProduct
 } from "../controllers/product.controllers.js";

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);
router.get('/:id',getProductById);


export default router;