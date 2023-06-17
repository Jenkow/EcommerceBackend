import { model,Schema } from "mongoose"

let collection = 'products'
let schema = new Schema ({
    title: {type:String, required:true, index:true},
    description: {type:String ,required:true},
    stock: {type:Number, required:true},
    thumbnail: {type:String, required:true},
    price: {type:Number, required:true}
},{versionKey:false})

let Product = model(collection, schema)
export default Product