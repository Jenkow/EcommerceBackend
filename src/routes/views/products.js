import { Router } from "express";
import Product from "../../models/product.model.js";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            let products = await Product.find().lean()
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