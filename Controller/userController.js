const User = require('..Model/userModel');
const signup = async (req,res)=>{

    try{

        const {name,email,password} = req.body;

        const existingUser = await User.findOne({
            email: email
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user' });
    }
}

const login = async (req,res)=>{

    try{
        const {email,password} = req.body;

        const user = await User.findOne({
            email
        });

        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }
        res.status(200).json({ userId: user._id });
    }
    catch(err){
        res.status(500).json({ message: 'Error logging in' });
    }
}
module.exports = {
    signup,
    login
};