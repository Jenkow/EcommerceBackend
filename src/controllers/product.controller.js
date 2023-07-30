import {productService} from "../service/index.js";

class ProductController { 
    getProducts = async (req, res, next) => {
        try {
            let products = await productService.getProducts()
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

    getProduct = async (req, res, next) => {
        try {
            let pid = req.params.pid
            let one = await productService.getProduct(pid)
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

    createProduct = async (req, res, next) => {
        try {
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let thumbnail = req.body.thumbnail ?? null
            let stock = req.body.stock ?? null
            if (title && description && price && thumbnail && stock) {
                let product = await productService.createProduct({ title, description, price, thumbnail, stock })
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

    updateProduct = async (req, res, next) => {
        try {
            if (req.body && req.params.pid) {
                let pid = req.params.pid
                let data = req.body
                let product = await productService.updateProduct(pid, data)
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

    deleteProduct = async (req, res, next) => {
        try {
            let pid = req.params.pid
            let deleted = await productService.deleteProduct(pid)
            return res.json({
                status: 200,
                deleted,
                response: 'product deleted'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default ProductController