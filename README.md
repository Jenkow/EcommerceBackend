# EcommerceBackend

ProductManager:

addProduct: agrega un producto al arreglo de productos del archivo. Todos los campos son obligatorios menos:
id que debe agregarse automáticamente  y autoincrementable
stock es opcional ya que si el usuario no lo envía debe ser cero.

getProducts: devuelve el arreglo con todos los productos guardados en el archivo.

getProductById: devuelve el producto con el id ingresado.

updateProduct: recibe un id y un objeto data con las propiedades a modificar del producto.

deleteProduct: recibe como parámetro el id del producto y debe borrar el producto del archivo.

CartManager:

addCart: agrega un carrito al arreglo de carritos del archivo. Recibe como parametro un arreglo de productos.

getCarts: devuelve el arreglo con todos los carritos guardados en el archivo.

getCartsById: devuelve el carrito con el id ingresado.

SERVER:

Para levantar el server se debera ejecutar en consola "npm dev run"

endpoints:

/api/products : GET: muestra los productos
                POST: crea un nuevo producto

/api/products/:pid : GET: toma el id ingresado como params y muestra el producto con esa id
                     PUT: modifica el producto con la id ingresada con el objeto   recibido del body
                     DEL: elimina el carrito


/api/carts : GET: muestra los carritos
             PUT: crea un nuevo carrito

/api/carts/:cid : GET: toma el id ingresado como params y muestra el carrito con esa id

/api/carts/:cid/product/:pid/:units : PUT: agrega n unidades (:units) al producto con id :pid, en el carrito con id :cid
                                      DEL: resta n unidades (:units) al producto con id :pid, en el carrito con id :cid


TEST: El archivo script.js crea una base de datos con archivos locales de productos y carritos. Todos los archivos se deben encontrar en la misma carpeta. Primero ejecutar el script.js para crear los archivos y luego ejecutar "npm run dev" en consola para levantar el server. Despues de esto ingresar desde el navegador a localhost:8080/(endpoints) para ver resultados. 