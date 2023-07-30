import productModel from './models/product.model.js'

class ProductDaoMongo {
    constructor(){
        this.productModel = productModel;
    }
    getProducts   = async () => {
        return await this.productModel.find()
    } 
    getProduct    = async (pid) => {
        return await this.productModel.findById(pid)
    } 
    createProduct = async (newProduct) => {
        return await this.productModel.create(newProduct)
    } 
    updateProduct = async (pid, data) => {
        return await this.productModel.updateOne({_id:pid}, data)
    } 
    deleteProduct = async (pid) => {
        return await this.productModel.deleteOne({_id:pid})
    } 
}

export default ProductDaoMongo