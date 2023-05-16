import { Router } from "express";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            return res.render(
                'new_product',
                {
                    title: 'New Product'
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router