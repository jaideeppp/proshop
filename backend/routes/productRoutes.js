import express from 'express';
import {
    createProduct, deleteProduct, getProductById, getProducts, updateProduct, createProductReview, getTopProducts
} from '../controllers/productController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'


const router = express.Router();


router
    .route('/products/')
    .get(getProducts)
    .post(protect, isAdmin, createProduct)

router
    .route('/products/:id/reviews')
    .post(protect, createProductReview)

router.get('/products/top', getTopProducts);

router
    .route('/product/:id')
    .get(getProductById)
    .delete(protect, isAdmin, deleteProduct)
    .put(protect, isAdmin, updateProduct)





export default router;