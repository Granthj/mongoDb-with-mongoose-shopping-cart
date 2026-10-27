const User = require('../Model/userModel');
const Cart = require('../Model/cartModal');
const addCart = async(req,res)=>{

    try{

        const {productId, quantity} = req.body;
        const userId = req.user._id;

        const existingUser = await Cart.findOne({ userId:userId });

        if(!existingUser){
            existingUser.items.push({productId, quantity});
            await existingUser.save();
            res.status(200).json(existingUser);
        }
        else{
            const existingItemIndex = existingUser.items.findIndex(item => item.productId.equals(productId));
            if (existingItemIndex !== -1) {
                existingUser.items[existingItemIndex].quantity += quantity;
            } else {
                existingUser.items.push({productId, quantity});
            }
            await existingUser.save();
            res.status(200).json(existingUser);
        }
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}
const removeCart = async(req,res)=>{

    try{
        const {productId} = req.body;
        const userId = req.user._id;

        const existingUser = await Cart.findOne({ userId:userId });
        if (!existingUser) {
            return res.status(404).json({ message: 'No cart found for this user' });
        }
        else{
            const existingItemIndex = existingUser.items.findIndex(item => item.productId.equals(productId));
            if (existingItemIndex !== -1) {
                existingUser.items[existingItemIndex].quantity -= quantity;
                if (existingUser.items[existingItemIndex].quantity <= 0) {
                    existingUser.items.splice(existingItemIndex, 1);
                }
            } else {
                existingUser.items.push({productId, quantity});
            }

        }
        await existingUser.save();
        res.status(200).json(existingUser);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}
module.exports = { addCart, removeCart };