const Order = require('../Model/orderModal');
const Product = require('../Model/productModal');
const createOrder = async (req, res) => {

    try{
        const { productId, quantity } = req.body;
        const userId = req.user._id;
        
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        let totalAmount = 0;
        totalAmount = quantity*product.price;

        const placeOrder = new Order({
            userId:userId,
            items:[
                {
                    productId:product._id,
                    quantity:quantity,
                    price:product.price
                }
            ],
            totalAmount:totalAmount
        });
        await placeOrder.save();
        res.status(201).json({
            message: 'Order placed successfully',
            order: placeOrder
        });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}

const deleteOrder = async(req,res)=>{

    try{
        const {orderId} = req.body;
        const userId = req.user._id;

        const existingOrder = await Order.findOne({ _id:orderId, userId:userId });
        if (!existingOrder) {
            return res.status(404).json({ message: 'No order found for this user' });
        }

        await Order.deleteOne({ _id: orderId, userId: userId });
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }   
}

module.exports = {
    createOrder,
    deleteOrder
};