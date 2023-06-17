import { Router } from "express";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            let carts = await Cart.find()
            let cart = carts[0]     //hardcodeo para usar el primero carrito
            let products = []
            let total = 0;
            await Promise.all(
                cart.products.map(async p => {
                    let product = await Product.findById(p._id)
                    total += p.units*product.price
                    products.push({
                        _id: p._id,
                        title: product.title,
                        units: p.units,
                        sub_total: (p.units*product.price)
                    })               
                }))
            return res.render(
                'carts',
                {
                    title: 'Carts',
                    products,
                    total
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router