import { Router } from "express";
import Product from "../../models/product.model.js";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            let page = req.query.page ?? 1
            let limit = req.query.limit ?? 6 
            let title = req.query.title ? {title : new RegExp(req.query.title, 'i')} : {}  ; 
            let products = await Product.paginate(
                title,
                {limit, page, lean:true}
            )
            let hidden = {
                prev: '',
                next: ''
            }
            if(!products.hasPrevPage){
                hidden.prev = "visibility: hidden"
            }
            if(!products.hasNextPage){
                hidden.next = "visibility: hidden"
            }
            return res.render(
                'products',
                {
                    title: 'Products',
                    products,
                    hidden
                }
            )
        } catch(error) {
            next(error)
        }
    }
)


export default router