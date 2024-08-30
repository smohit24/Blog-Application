const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');

//create user register
exports.registerControllers = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        //validation 
        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                messages:'please fill all fields',
            })
        }
        //existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                messages: 'user already exitsits',
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
       
        // save new user

        const user = new userModel({ username, email, password: hashedPassword });
        await user.save()
        return res.status(201).send({
            success: true,
            messages: 'New User Created',
            user,
        })

        
    } catch(error) {
        console.log(error);
        return res.status(500).send({
            messages: 'Error In Register callback',
            success: false,
            error,
        })
        
    }

 };

//get all user
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            messages: "All user data ",
            users,

        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            messages: "Error in get all users",
            error,
            })
    }
};



//login
exports.loginControllers = async (req, res) => {
    try {
        
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(401).send({
                success: false,
                messages: "Please provide email or password",
                
            });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(200).send({
                success: false,
                messages: "Email is not registered",
            });
        }
        //paasword
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                messages: "Invalid username or password",
            });
        }
        return res.status(200).send({
            success: true,
            messages: "Login Successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            messages: "Error in callback",
            error
        })
    }
}
 

