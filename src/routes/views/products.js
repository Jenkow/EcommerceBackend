import { Router } from "express";
import ProductManager from '../../managers/ProductManager.js'
let manager = new ProductManager('./src/data/products.json')

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            let products = await(manager.getProducts())
            return res.render(
                'products',
                {
                    title: 'Products',
                    products
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router