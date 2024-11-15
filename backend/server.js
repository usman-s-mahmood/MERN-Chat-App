// node_modules
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
// Routes
import authRoutes from './routes/auth.routes.js'
import messageRoutes from './routes/message.routes.js'
import userRoutes from './routes/user.routes.js'
// Database Connector
import connectToMongoDB from './db/connectToMongoDB.js';
// Socket IO
import { server, app } from './socket/socket.js';


dotenv.config();

const __dirname = path.resolve();

const PORT = 5000;

// app.use(cors({
//     origin: 'https://mernchat-sigma.vercel.app/',
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
//     credentials: true
// }));

// app.use(cors());

app.use(express.json());
app.use(cookieParser());

// app.get(
//     '/',
//     (req, res) => {
//         res.send("<h1>Server Is Running</h1>");
//     }
// );

app.use(
    '/api/auth',
    authRoutes
);

app.get(
    '/api/test',
    async (req, res) => {
        return res.send({message: "API Is Working!"});
    }
);

app.use(
    '/api/messages',
    messageRoutes
);

app.use(
    '/api/users',
    userRoutes
);


app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
    return res.json({message: "API Is Working!"});
});

server.listen(
    PORT,
    async () => {
        connectToMongoDB();
        console.log(`server is running on port: ${PORT}`);
    }
);
