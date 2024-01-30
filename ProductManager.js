const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
  }

  loadProducts() {
    if (!fs.existsSync(this.path)) {
      return [];
    }
    const data = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(data);
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  addProduct(product) {
    const lastProduct = this.products[this.products.length - 1];
    const newProduct = {
      id: lastProduct ? lastProduct.id + 1 : 1,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };
    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  updateProduct(id, product) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    this.products[index] = { ...this.products[index], ...product };
    this.saveProducts();
    return true;
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return false;
    }
    this.products.splice(index, 1);
    this.saveProducts();
    return true;
  }
}

module.exports = ProductManager;
