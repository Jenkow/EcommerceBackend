import fs from 'fs'

class ProductManager {

    constructor(path) {
        this.products = []
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
            this.products = JSON.parse(fs.readFileSync(path, 'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }

    async addProduct({ title, description, price, thumbnail, stock }) {
        try {
            let id
            if (this.products.length === 0) {
                id = 1
            } else {
                id = this.products[this.products.length - 1].id + 1
            }
            stock = stock ?? 0
            let product = { title, description, price, thumbnail, stock, id }
            this.products.push(product)
            let products_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, products_json)
            console.log('product id: ' + product.id)
            return product
        }
        catch (err) {
            console.log('addProduct: error')
            return 'addProduct: error'
        }
    }

    async getProducts() {
        try {
            if (this.products.length === 0) {
                console.log('Not found')
                return this.products
            }
            return this.products
        }
        catch (err) {
            console.log('getProduct: error')
            return 'getProduct: error'
        }

    }

    getProductById(id) {
        try {
            let product = this.products.find(p => p.id === id)
            product = product ?? null
            return product
        }
        catch (err) {
            console.log('getProductById: error')
            return 'getProductById: error'
        }

    }

    async updateProduct(id, data) {
        try {
            console.log("hola")
            let product = this.getProductById(id)
            if (!product) {
                console.log(product)
                return product
            }
            for (let prop in data) {
                console.log("hola")
                product[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('updateProduct: done')
            return product
        }
        catch (err) {
            console.log(err)
            return 'updateProduct: error'
        }
    }

    async deleteProduct(id) {
        try {
            this.products = this.products.filter(p => p.id !== id)
            let data_json = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, data_json)
            console.log('deleteProduct: done')
            return 'deleteProduct: done'
        }
        catch (err) {
            console.log(err)
            return 'deleteProduct: error'
        }
    }

}

export default ProductManager