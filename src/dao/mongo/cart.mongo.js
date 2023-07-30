import cartModel from './models/cart.model.js'

class CartDaoMongo {
    constructor(){
        this.cartModel = cartModel;
    }
    getCarts   = async () => {
        return await this.cartModel.find()
    } 
    getCart    = async (cid) => {
        return await this.cartModel.findById(cid)
    } 
    createCart = async (newCart) => {
        return await this.cartModel.create(newCart)
    } 
    updateCart = async (cid, data) => {
        return await this.cartModel.updateOne(cid, data)
    } 
}

export default CartDaoMongo