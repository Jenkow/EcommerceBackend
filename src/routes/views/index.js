import { Router } from "express";
import products_router from './products.js'
import carts_router from './carts.js'
import new_product_router from './new_product.js'
import one_product_router from './one_product.js'
import chat_router from "./chat.js";
import signin_router from "./sign_in.js"
import register_router from "./register.js";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            return res.render(
                'index',
                {
                    title: 'index',
                    script: 'connection.js',
                    logged_in: !!req.session.email
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
router.use('/products', one_product_router)
router.use('/chat', chat_router)
router.use('/auth/signin', signin_router)
router.use('/auth/register', register_router)

export default router