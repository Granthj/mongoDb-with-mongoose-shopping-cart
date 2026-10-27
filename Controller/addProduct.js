const Product = require('../Model/productModal');

const addProduct = async (req, res) => {
    try {
        const {name, description, price, imageUrl} = req.body;

        const newProduct = new Product({
            name: name,
            description: description,
            price: price,
            imageUrl: imageUrl
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  
module.exports = {
    addProduct
};