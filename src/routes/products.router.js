import { Router } from "express";
import productsManager from '../ProductsManager.js'

const router = Router()

//getProducts()
router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts()
        const {limit} = req.query
        let limitedProds;
        if (!limit) {
            limitedProds = products
        } else {
            limitedProds = products.slice (0,limit);
        }    
        res.status(200).json({ message: 'Products', products: limitedProds })
        console.log('filtered products:', limitedProds);
    } catch (error) {
        res.status(500).json({ error })
    }
});

//getProducById()
router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    console.log('requested Prod ID:', pid);
    try {
        const product = await productsManager.getProductById(+pid)
        res.status(200).json({ message: 'Product find', product })
    } catch (error) {
        res.status(500).json({ error })
    }
});

//addProduct()
router.post ('/', async (req, res) => {
    console.log(req.body);
    try {
        const newProduct = await productsManager.addProduct(req.body);
        res.status (200).json ({message: 'Product Added', product: newProduct})
        
    } catch (error) {
        res.status (500).json ({error})
    }
}
);

//updateProduct()
router.put ('/:pid', async (req, res) => {
    const {pid} = req.params
    try {
        const productUpdated = await productsManager.updateProduct(+pid, req.body)
        res.status(200).json({message: 'Product updated', productUpdated})
    } catch (error) {
        res.status(500).json ({error})
    }
});

//deleteProduct()
router.delete('/:pid', async (req, res) => {
    const {pid} = req.params
    try {
        const deletedProduct = await productsManager.deleteProduct (+pid)
        res.status(200).json ({message: 'Product deleted', deletedProduct})
    } catch (error) {
        res.status (500).json ({error})
    }
});


export default router;