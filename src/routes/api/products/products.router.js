import { Router } from 'express';
import ProductController from '../../../controllers/product.controller.js';


const router = Router()
const productController = new ProductController()

router.get('/', productController.getProducts)
router.get('/:pid', productController.getProduct)
router.post('/', productController.createProduct)
router.put('/:pid', productController.updateProduct)
router.delete('/:pid', productController.deleteProduct)

export default router