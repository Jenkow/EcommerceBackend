import { Router } from 'express';
import Cart from '../../../dao/mongo/models/cart.model.js'
import Product from '../../../dao/mongo/models/product.model.js';

const router = Router()

let cartBill_route = '/:cid'
let cartBill_function = async (req, res, next) => {
    try {
        let id = req.params.cid
        let cart = await Cart.findById(id)
        console.log(cart)
        if (cart) {
            let total = 0;
            await Promise.all(
                cart.products.map(async p => {
                    let product = await Product.findById(p._id)
                    total += p.units*product.price               
                }))
            return res.json({
                status: 200,
                cart_id: id,
                total
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
router.get(cartBill_route, cartBill_function)

export default router