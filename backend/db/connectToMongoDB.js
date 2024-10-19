import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({path: '../../.env'});

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mern_chat_app');
        console.log(`Connected To Mongo DB`);
    } catch(error) {
        console.error(`Error Connecting To MongoDB: ${error}`);
    }
}

export default connectToMongoDB