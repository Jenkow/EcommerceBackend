import { model,Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

let collection = 'products'
let schema = new Schema ({
    title: {type:String, required:true, index:true},
    description: {type:String ,required:true},
    stock: {type:Number, required:true},
    thumbnail: {type:String, required:true},
    price: {type:Number, required:true}
},{versionKey:false})

schema.plugin(mongoosePaginate)
let Product = model(collection, schema)
export default Product