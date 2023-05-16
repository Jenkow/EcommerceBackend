import { Router } from "express";
import products_router from './products.js'
import carts_router from './carts.js'
import new_product_router from './new_product.js'
import one_product_router from './one_product.js'
import chat_router from "./chat.js";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            return res.render(
                'index',
                {
                    title: 'index',
                    script: 'connection.js'
                }
            )
        } catch(error) {
            next(error)
        }
    }
)

router.use('/products', products_router)
router.use('/carts', carts_router)
router.use('/new_product', new_product_router)
router.use('/products',one_product_router)
router.use('/chat',chat_router)

export default router