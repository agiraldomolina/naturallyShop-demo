import  express  from "express";
import {protect, admin } from "../middleware/authMiddleware.js";
import { 
    getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductReview
 } from "../controllers/product.controllers.js";

const router = express.Router();

router.get('/', getProducts);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.get('/:id',getProductById);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/:id/reviews', protect, createProductReview);

export default router;