import express from 'express';
import { getMessages, sendMessage } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';


const router = express.Router();

router.post(
    '/send/:id',
    protectRoute,
    sendMessage
);

router.post(
    '/:id',
    protectRoute,
    getMessages
);

export default router;