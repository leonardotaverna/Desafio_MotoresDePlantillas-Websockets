import { existsSync, promises } from 'fs';


class ProductsManager {
    constructor(path) {
        this.path = path;
    }

    async getProducts() {
        try {
            if (existsSync(this.path)) {
                const data = await promises.readFile(this.path, 'utf-8')
                return JSON.parse(data)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(objProd) {
        const {title, description, price, thumbnail, code, stock} = objProd;
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) {
                console.error('Todos los campos son obligatorios');
                return;
            }

            const products = await this.getProducts()

            const id = products.length === 0 ? 1 : products[products.length - 1].id + 1

            const existingProduct = products.find(product => product.code === code);
            if (existingProduct) {
                console.error('Ya existe un producto con el mismo código');
                return;
            }

            const product = {
                id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock,
            };

            products.push(product)
            await promises.writeFile(this.path, JSON.stringify(products))
            return product
        } catch (error) {
            return error
        }
    }

    async getProductById(pid) {
        try {
            const products = await this.getProducts()
            const product = products.find(product => product.id === pid);
            if (product) {
                return product;
            } else {
                console.error('Not found');
            }

        } catch (error) {
            return error
        }
    }

    async updateProduct(id, objProd) {
        try {
            const products = await this.getProducts()
            const productIndex = products.findIndex ((p) => p.id === id)
            if (productIndex === -1){
                return 'No existe un producto con ese id'
            }
            const prod = products 
            [productIndex]
            products [productIndex] = {...prod,...objProd, id: prod.id}

            await promises.writeFile(this.path, JSON.stringify(products))
            
        } catch (error) {
            return error
        } 
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            const newProductsArray = products.filter ((p) => p.id !== id)
            if (newProductsArray === -1){
                return 'No existe un producto con ese id'
            }

            await promises.writeFile(this.path,JSON.stringify(newProductsArray))

        } catch (error) {
            return error
        }
    }
};


const productsManager = new ProductsManager ('Products.json')

export default productsManager