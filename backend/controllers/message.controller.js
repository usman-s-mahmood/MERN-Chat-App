import { isValidObjectId } from "mongoose";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


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
            id,
            message
        });

        if (newMessage)
            conversation.message.push(newMessage._id);

        res.json({message: 'Message Sent Successfully!'});
        
    } catch(error) {
        console.error(`Internal Server Error at sendMessage controller: ${error.message}`);
        res.status(500).json({error: "Internal Server Error"});
    }
}