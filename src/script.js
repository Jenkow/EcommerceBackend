import ProductManager from './managers/ProductManager.js'
import CartManager from './managers/CartManager.js'

async function p_manager() {
    let manager = new ProductManager('./src/data/products.json')
    await manager.addProduct({ title: 'vaper', description: 'cigarrillo electronico', price: 10000 })
    await manager.addProduct({ title: 'rtx 3080', description: 'placa de video', price: 350000, stock: 3 })
    await manager.addProduct({ title: 'ojota', description: 'pa caminar', price: 15000, stock: 8 })
    await manager.addProduct({ title: 'pantalon', description: 'pa las gambas', price: 30000, stock: 2 })
    await manager.addProduct({ title: 'remera', description: 'pal pecho', price: 7000, stock: 6 })
    await manager.addProduct({ title: 'anteojos', description: 'pa los ojos', price: 25000, stock: 16 })
    await manager.addProduct({ title: 'gorro', description: 'pa la cabeza', price: 8000, stock: 8 })
    await manager.addProduct({ title: 'guantes', description: 'pa las manos', price: 3000, stock: 25 })
    await manager.addProduct({ title: 'zapas', description: 'pa las patas', price: 35000, stock: 8 })
    await manager.addProduct({ title: 'moto', description: 'zanellusqui', price: 300000, stock: 1 })
    console.log(manager.getProductById(9))
    await manager.updateProduct(9, { title: 'CAMBIADO' })
    await manager.deleteProduct(10)
    await manager.getProducts()
}

async function c_manager() {
    let manager = new CartManager('./src/data/carts.json')
    await manager.addCart([{id:2, units:3}, {id:5, units:1}])
    await manager.addCart([{id:1, units:6}, {id:3, units:4}])
    await manager.addCart([{id:8, units:4}, {id:5, units:1}])
    await manager.addCart([{id:9, units:6}, {id:7, units:2}])
    console.log(manager.getCartById(2))
    await manager.getCarts()
}

p_manager()
c_manager()
