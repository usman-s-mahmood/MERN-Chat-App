import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';


const app = express();
dotenv.config({path: '../.env'});

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get(
    '/',
    (req, res) => {
        res.send("<h1>Server Is Running</h1>");
    }
);

app.use(
    '/api/auth',
    authRoutes
);

app.use(
    '/api/messages',
    messageRoutes
);

app.listen(
    PORT,
    async () => {
        connectToMongoDB();
        console.log(`server is running on port: ${PORT}`);
    }
);