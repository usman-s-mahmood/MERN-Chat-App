import { isValidObjectId } from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id} = req.params;

        if (!isValidObjectId(id))
            return res.status(500).json({error: 'Invalid Request! Process Failed'});

        const senderID = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderID, id]}
        });

        if (!conversation)
            conversation = await Conversation.create({participants: [senderID, id]});

        const newMessage = new Message({
            senderID,
            receiverID: id,
            message
        });

        if (newMessage) 
            conversation.message.push(newMessage._id);

        // this will run in parallel and save more time

        const receiverSocketId = getReceiverSocketId(id);

        if (receiverSocketId)
            io.to(receiverSocketId).emit("newMessage", newMessage);

        await Promise.all([newMessage.save(), conversation.save()]);

        res.json(newMessage);
        
    } catch(error) {
        console.error(`Internal Server Error at sendMessage controller: ${error.message}`);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatID} = req.params;

        if (!isValidObjectId(userToChatID))
            return res.status(403).json({error: "Invalid Request! Operation Failed"});

        const senderID = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderID, userToChatID]},
        }).populate('message');

        if (!conversation)
            return res.json({message: {}});

        const messages = conversation.message;

        res.json(messages);

    } catch(error) {
        console.error(`Internal Server Error at getMessage controller: ${error.message}`);
        res.status(500).json({error: "Internal Server Error"});
    }
}