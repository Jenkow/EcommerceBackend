import { Router } from 'express';
import Cart from '../../../models/cart.model.js'
import bills_router from './bills_router.js'

const router = Router()

router.use('/bills', bills_router)

let carts_route = '/'
let carts_function = async (req, res, next) => {
    try {
        let carts = await Cart.find()
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
        let id = req.params.cid
        let one = await Cart.findById(id)
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
            let products = []
            let cart = await Cart.create({products})
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
                let cid = req.params.cid
                let pid = req.params.pid
                let units = Number(req.params.units)
                let cart = await Cart.findOne({_id:cid})
                let new_products = []
                let is_in = false
                if(cart.products.length === 0){
                    new_products = [{_id: pid, units: units}]
                }
                cart.products.forEach(p => {
                    if (p._id === pid) {
                        new_products.push({
                            _id: pid,
                            units: p.units + units
                        })
                        is_in = true
                        return
                    }
                    else {
                        new_products.push(p)
                        return
                    }
                })
                if(!is_in){
                    new_products.push({_id: pid, units: units})
                }
                let updated = await Cart.updateOne({ _id: cart._id }, { $set: { products: new_products } })
                return res.json({
                    status: 200,
                    updated,
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
                const cid = req.params.cid
                const pid = req.params.pid
                const units = req.params.units
                const cart = await Cart.findOne({_id:cid})
                if(!cart){
                    return res.json({
                        status: 404,
                        response: 'cart not found'
                    })
                }
                const data = []
                cart.products.forEach(p => {
                    if(p._id !== pid){
                        data.push(p)
                        return
                    }
                    if(units >= p.units) {
                        return
                    }
                    data.push({...p, units: p.units-units})
                })
                await Cart.updateOne({_id:cid}, {$set:{products: data}})
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