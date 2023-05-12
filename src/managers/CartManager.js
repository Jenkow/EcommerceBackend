import fs from 'fs'
import ProductManager from './ProductManager.js'
let p_manager = new ProductManager('./src/data/products.json')

class CartManager {

    constructor(path) {
        this.carts = []
        this.path = path
        this.init(path)
    }

    init(path) {
        let file = fs.existsSync(this.path)
        if (!file) {
            fs.writeFileSync(path, '[]')
            console.log('file created at path: ' + path)
            return 'file created at path: ' + path
        } else {
            this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }

    async addCart(products) {
        try {
            let id
            if (this.carts.length === 0) {
                id = 1
            } else {
                id = this.carts[this.carts.length - 1].id + 1
            }
            let cart = {id,products}
            this.carts.push(cart)
            let carts_json = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, carts_json)
            console.log('cart id: ' + cart.id)
            return cart
        }
        catch (err) {
            console.log('addCart: error')
            return 'addCart: error'
        }
    }

    getCarts() {
        try {
            if (this.carts.length === 0) {
                console.log('Not found')
                return this.carts
            }
            return this.carts
        }
        catch (err) {
            console.log('getCarts: error')
            return 'getCarts: error'
        }

    }

    getCartById(id) {
        try {
            let cart = this.carts.find(c => c.id === id)
            cart = cart ?? null
            return cart
        }
        catch (err) {
            console.log('getCartById: error')
            return 'getCartById: error'
        }

    }

    async updateCart(id, data){
        try{
            let product = p_manager.getProductById(data.id)
            if(data.units > product.stock) {             //igualo la cantidad a agregar con el stock disponible
                data.units = product.stock
            }
            let cart = this.getCartById(id)
            if(!cart){
                console.log(cart)
                return cart
            }
            let is_in = false
            for (let i in cart.products) {
                let product = cart.products[i]
                if (product.id === data.id){
                    if (data.units < 0 && -data.units > product.units){    //igualo cantitad a sacar con la cantidad del producto en carrito
                        data.units = -product.units
                    }
                    product.units = product.units + data.units
                    is_in = true
                }
            }
            if(!is_in && data.units > 0){                 //agrego condicional de data.units para que no agregue un producto cuando este eliminando (data.units negativo)
                cart.products.push(data)
            }
            await p_manager.updateProduct(data.id, {stock: product.stock-data.units})
            let data_json = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('updateCart: done')
            return cart
        } catch(error) {
            console.log(error)
            return 'updateCart: error'
        }
    }

    async deleteCart(id) {
        try {
            this.carts = this.carts.filter(c => c.id !== id)
            let data_json = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('deleteCart: done')
            return 'deleteCart: done'
        }
        catch (err) {
            console.log(err)
            return 'deleteCart: error'
        }
    }
}


export default CartManager