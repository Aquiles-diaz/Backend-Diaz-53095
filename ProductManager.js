class ProductManager {
    constructor() {
      this.products = [];
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      // Verifica
      const codeExists = this.products.some((product) => product.code === code);
      if (codeExists) {
        throw new Error("El código del producto ya está en uso.");
      }
  
      // Genera un ID único
      const id = Date.now().toString();
  
      // Creamos el objeto del producto
      const newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      // Agregar el producto al array
      this.products.push(newProduct);
  
      // Devolver el ID generado automáticamente
      return id;
    }
  
    getProductById(productId) {
      const product = this.products.find((product) => product.id === productId);
      if (!product) {
        throw new Error("Producto no encontrado.");
      }
      return product;
    }
  }
  
  const productManager = new ProductManager();
  
  // Obtener productos (debería devolver [])
  console.log(productManager.getProducts());
  
  // Agrega un producto
  const productId = productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 10000,
    thumbnail: "Sin img",
    code: "abc123",
    stock: 45,
  });
  
  // Obtener productos (debería devolver el producto recién agregado)
  console.log(productManager.getProducts());
  
  // Intentar agregar el mismo producto (debería arrojar un error)
  try {
    productManager.addProduct({
      title: "producto prueba",
      description: "Este es un producto prueba",
      price: 200,
      thumbnail: "Sin imagen",
      code: "abc123",
      stock: 25,
    });
  } catch (error) {
    console.error(error.message);
  }
  
  // Obtoene producto por ID
  console.log(productManager.getProductById(productId));