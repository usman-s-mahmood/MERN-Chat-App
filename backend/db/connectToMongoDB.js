import mongoose from 'mongoose';
import dotenv from 'dotenv'

// dotenv.config({path: '../../.env'});
dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`Connected To Mongo DB`);
    } catch(error) {
        console.error(`Error Connecting To MongoDB: ${error}`);
    }
}

export default connectToMongoDB