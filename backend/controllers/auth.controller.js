import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const {
            fullName,
            username,
            password,
            confirmPassword,
            gender
        } = req.body;

        if (password.toString() !== confirmPassword.toString())
            return res.status(400).json({error: 'passwords don\'t match'});

        const user = await User.findOne({username});

        if (user) 
            return res.status(403).json({error: 'Provide a unique username!'});

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(
            password,
            salt
        );

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === 'male' ? boyProfilePic: girlProfilePic
        });
        
        if (newUser) {
            await newUser.save();
            await generateTokenAndSetCookie(
                newUser._id,
                res
            );
            res.json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        }
        else
            res.status(400).json({error: 'Invalid User Data'});


    } catch(error) {
        console.error(`Error in Signup Controller: ${error}`);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const login = (req, res) => {
    console.log('login'); 
}

export const logout = (req, res) => {
    console.log(`logout`);
}
