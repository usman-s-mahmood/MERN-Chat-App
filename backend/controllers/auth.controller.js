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

export const login = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        const user = await User.findOne({username});

        if (!user)
            return res.status(404).json({error: "Request Failed! Try Again"});

        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({error: "Invalid Credits! Try Again"});

        await generateTokenAndSetCookie(
            user._id,
            res
        );

        res.json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });

    } catch(error) {
        console.error(`Error in Login Controller: ${error}`);
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 0});
        return res.json({message: "Logout Successfull"});
    } catch(error) {
        console.error(`Error in Logout Controller: ${error}`);
        res.status(500).json({error: 'Internal Server Error'});
    }
}
