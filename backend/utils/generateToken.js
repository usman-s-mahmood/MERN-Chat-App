import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config({path: '../../.env'});

const generateTokenAndSetCookie = (userID, res) => {
    const token = jwt.sign(
        {userID},
        process.env.JWT_SECTRET, {
            expiresIn: '15d'
        }
    );

    res.cookie(
        'jwt', 
        token, {
            maxAge: 15 * 24 * 60 * 60 * 1000, // MilliSecond
            httpOnly: true, // for XSS protection
            sameSite: 'strict', // for CSRF Protection
            secure: process.env.MODE_ENV !== 'development' // for setting up http or https depending on environment
        }
    );
}

export default generateTokenAndSetCookie