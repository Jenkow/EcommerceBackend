import { Router } from "express";
import Product from "../../dao/mongo/models/product.model.js";

const router = Router()

router.get(
    '/:pid',
    async (req, res, next) => {
        try{
            let id = req.params.pid
            let product = await Product.findById(id).lean()
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