import {cartService} from "../service/index.js";

class CartController { 

    getCarts = async (req, res, next) => {
        try {
            let carts = await cartService.getCarts()
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

    getCart = async (req, res, next) => {
        try {
            let cid = req.params.cid
            let one = await cartService.getCart(cid)
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

    createCart = async (req, res, next) => {
        try {
            let products = []
            let cart = await cartService.createCart({products})
            return res.json({
                status: 201,
                cart: cart.id,
                response: 'created!'
            })
        } catch (error) {
            next(error)
        }
    }

    updateCart = async (req, res, next) => {
        try {
            if (req.body && req.params.cid && req.params.pid && req.params.units) {
                let cid = req.params.cid
                let pid = req.params.pid
                let units = Number(req.params.units)
                let cart = await cartService.getCart(cid)
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
                let updated = await cartService.updateCart({ _id: cart._id }, { $set: { products: new_products } })
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

    deleteCart = async (req, res, next) => {
        try {
            if (req.body && req.params.cid && req.params.pid && req.params.units) {
                const cid = req.params.cid
                const pid = req.params.pid
                const units = req.params.units
                const cart = await cartService.getCart(cid)
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
                await cartService.updateCart({_id:cid}, {$set:{products: data}})
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
}

export default CartController