import { Router } from 'express';
import Product from '../../../models/product.model.js';

const router = Router()

let products_route = '/'
let products_function = async (req, res, next) => {
    try {
        let products = await Product.find()
        if (products.length > 0) {
            return res.json({
                status: 200,
                products
            })
        } else {
            return res.json({
                status: 404,
                response: 'not found'
            })
        }
    } catch (error) {
        next(error)
    }

}
router.get(products_route, products_function)


let productById_route = '/:pid'
let productById_function = async (req, res, next) => {
    try {
        let id = req.params.pid
        let one = await Product.findById(id)
        if (one) {
            return res.json({
                status: 200,
                response: one
            })
        } else {
            return res.json({
                status: 404,
                response: 'not found'
            })
        }
    } catch (error) {
        next(error)
    }
}
router.get(productById_route, productById_function)


router.post(
    '/',
    async (req, res, next) => {
        try {
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let thumbnail = req.body.thumbnail ?? null
            let stock = req.body.stock ?? null
            if (title && description && price && thumbnail && stock) {
                let product = await Product.create({ title, description, price, thumbnail, stock })
                return res.json({
                    status: 201,
                    product: product.id,
                    response: 'created!'
                })
            } else {
                return res.json({
                    status: 400,
                    response: 'check data!'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)


router.put(
    '/:pid',
    async (req, res, next) => {
        try {
            if (req.body && req.params.pid) {
                let id = req.params.pid
                let data = req.body
                let product = await Product.updateOne({_id:id}, data)
                if (product) {
                    return res.json({
                        status: 200,
                        product_id: product.id,
                        product,
                        response: 'product updated!'
                    })
                } else {
                    return res.json({
                        status: 400,
                        response: 'check data'
                    })
                }
            } else {
                return res.json({
                    status: 400,
                    response: 'check data'
                })
            }
        } catch (error) {
            next(error)
        }

    }
)


router.delete(
    '/:pid',
    async (req, res, next) => {
        try {
            let id = req.params.pid
            let deleted = await Product.deleteOne({_id:id})
            return res.json({
                status: 200,
                deleted,
                response: 'product deleted'
            })
        } catch (error) {
            next(error)
        }
    }
)

export default router