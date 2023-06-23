import { Router } from 'express'
import products_router from './products/products.mongo.js'
import carts_router from './carts/carts.mongo.js'
import auth_router from './auth/auth.js'

const router = Router()

router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/auth',auth_router)

export default router