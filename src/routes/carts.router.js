import { Router } from "express";
import cartsManager from "../cartsManager.js";

const router = Router ()

//getCarts()
router.get('/', async (req, res) => {
    try {
        const carts = await cartsManager.getCarts()    
        res.status(200).json({ message: 'Carts', carts })
    } catch (error) {
        res.status(500).json({ error })
    }
});

//getCartById()
router.get ('/:cid', async (req,res) => { 
    const {cid} = req.params
    try {
        const carts = await cartsManager.getCartById(+cid)
        res.status(200).json      ({message: 'Carts', carts})
    } catch (error) {
        res.status(500).json ({ error })
        
    }
});

//createCart()
router.post('/', async(req, res) => {
    try {
        const newCart = await cartsManager.createCart()
        res.status(200).json({message: 'Cart', cart:newCart}) 
    } catch (error) {
        res.status(500).json ({ error })    
    }
});

//addProductToCart
router.post ('/:idCart/products/:idProduct', async (req,res) => {
    const{idCart, idProduct} = req.params
    try {
        const addProductToCart = await cartsManager.addProductToCart(+idCart, +idProduct)
        res.status (200).json ({message:'Cart products', cart:addProductToCart})
    } catch (error) {
        res.status(500).json ({ error }) 
    }
})


export default router;