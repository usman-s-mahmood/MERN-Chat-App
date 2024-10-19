// node_modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// Routes
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
// Database Connector
import connectToMongoDB from './db/connectToMongoDB.js';
// Socket IO
import { server, app } from './socket/socket.js';


dotenv.config({path: '../.env'});

const PORT = process.env.PORT || 3000;

app.use(cors({
    // origin: 'https://domain-name.com',
    // credentials: true
}));
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

app.use(
    '/api/users',
    userRoutes
);

server.listen(
    PORT,
    async () => {
        connectToMongoDB();
        console.log(`server is running on port: ${PORT}`);
    }
);