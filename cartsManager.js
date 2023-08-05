import { existsSync, promises } from 'fs';


class CartsManager {
    constructor(path) {
        this.path = path;
    }

    async getCarts() {
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
    };

    async getCartById(cid) {
        try {
            const carts = await this.getCarts()
            const cart = carts.find(cart => cart.id === cid);
            if (cart) {
                return cart;
            } else {
                console.error('Cart Not found');
            }

        } catch (error) {
            return error
        }
    };

    async createCart() {
        try {
            const carts = await this.getCarts()

            const id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1

            const newCart = {
                products: [], 
                id
            };

            carts.push(newCart)
            await promises.writeFile(this.path, JSON.stringify(carts));
            return newCart;
        } catch (error) {
            return error
        }
    };

    async addProductToCart (idCart, idProduct){
        const carts = await this.getCarts()
        const cart = carts.find(cart => cart.id === idCart)
        const productIndex = cart.products.findIndex (prod => prod.product ===idProduct)
        if (productIndex === -1){
            cart.products.push ({product:idProduct, quantity:1})
        }else{
            cart.products[productIndex].quantity++
        }
        await promises.writeFile(this.path,JSON.stringify(carts))
        return cart
    }
};


const cartsManager = new CartsManager ('Carts.json')

export default cartsManager