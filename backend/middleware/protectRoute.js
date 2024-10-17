import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import { isValidObjectId } from 'mongoose';

dotenv.config({path: '../../.env'});

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token)
            return res.status(401).json({error: 'Invalid Auth Token!'});

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECTRET
        );

        if (!decoded)
            return res.status(400).json({error: 'Authentication Failed!'});

        if (!isValidObjectId(decoded.userID))
            return res.status(500).json({error: 'Internal Server Error!'});

        const user = await User.findById(decoded.userID);

        if (!user)
            return res.status(500).json({error: 'Failed To Reach Server!'});

        req.user = user;

        next();
    } catch(error) {
        console.error(`Internal Server Error At Protect Route middleware: ${error.message}`);   
        res.status(500).json({error: 'Internal Server Error'});
    }
}

export default protectRoute;