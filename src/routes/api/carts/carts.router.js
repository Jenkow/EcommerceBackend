import { Router } from 'express';
import bills_router from './bills_router.js'
import CartController from '../../../controllers/cart.controller.js';

const router = Router()
const cartController = new CartController()

router.use('/bills', bills_router)

router.get('/', cartController.getCarts)
router.get('/:cid', cartController.getCart)
router.post('/', cartController.createCart)
router.put('/:cid/product/:pid/:units', cartController.updateCart)
router.delete('/:cid/product/:pid/:units', cartController.deleteCart)

export default router