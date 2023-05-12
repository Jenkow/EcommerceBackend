import { Router } from 'express'
import products_router from './products/products_router.js'
import carts_router from './carts/carts_router.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', carts_router)

export default router