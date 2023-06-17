import { Router } from 'express';
import bills_router from './bills_router.js'

const router = Router()

router.use('/bills', bills_router)

let carts_route = '/'
let carts_function = async (req, res, next) => {
    try {
        let carts = manager.getCarts()
        if (carts.length > 0) {
            return res.json({
                status: 200,
                carts
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
router.get(carts_route, carts_function)


let cartById_route = '/:cid'
let cartById_function = async (req, res, next) => {
    try {
        let id = Number(req.params.cid)
        let one = manager.getCartById(id)
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
router.get(cartById_route, cartById_function)



router.post(
    '/',
    async (req, res, next) => {
        try {
            let cart = await manager.addCart([])
            return res.json({
                status: 201,
                cart: cart.id,
                response: 'created!'
            })
        } catch (error) {
            next(error)
        }
    }
)




router.put(
    '/:cid/product/:pid/:units',
    async (req, res, next) => {
        try {
            if (req.body && req.params.cid && req.params.pid && req.params.units) {
                let cid = Number(req.params.cid)
                let data = {
                    id: Number(req.params.pid),
                    units: Number(req.params.units)
                }
                await manager.updateCart(cid, data)
                return res.json({
                    status: 200,
                    cid,
                    response: 'cart updated'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)



router.delete(
    '/:cid/product/:pid/:units',
    async (req, res, next) => {
        try {
            if (req.body && req.params.cid && req.params.pid && req.params.units) {
                let cid = Number(req.params.cid)
                let data = {
                    id: Number(req.params.pid),
                    units: -Number(req.params.units)
                }
                await manager.updateCart(cid, data)
                return res.json({
                    status: 200,
                    cid,
                    response: 'cart updated'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)

export default router