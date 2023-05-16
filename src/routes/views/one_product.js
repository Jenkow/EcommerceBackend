import { Router } from "express";
import ProductManager from '../../managers/ProductManager.js'
let manager = new ProductManager('./src/data/products.json')

const router = Router()

router.get(
    '/:pid',
    async (req, res, next) => {
        try{
            let id = Number(req.params.pid)
            let product = await(manager.getProductById(id))
            return res.render(
                'one_product',
                {
                    title: product.title,
                    product,
                    script: 'product.js'
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router