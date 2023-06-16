import { Router } from 'express'
import products_router from './products/products.mongo.js'
import carts_router from './carts/carts.mongo.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', carts_router)

export default router