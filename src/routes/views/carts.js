import { Router } from "express";
import CartManager from '../../managers/CartManager.js'
let c_manager = new CartManager('./src/data/carts.json')
import ProductManager from '../../managers/ProductManager.js'
let p_manager = new ProductManager('./src/data/products.json')

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            let cart = c_manager.getCartById(1)
            let products = []
            let total = 0;
            (cart.products).forEach(p => {
                let product = p_manager.getProductById(p.id)
                total += p.units*product.price
                products.push({
                    id: p.id,
                    title: product.title,
                    units: p.units,
                    sub_total: (p.units*product.price)
                })
            });
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