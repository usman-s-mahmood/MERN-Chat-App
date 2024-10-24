import mongoose from 'mongoose';
import dotenv from 'dotenv'

// dotenv.config({path: '../../.env'});
dotenv.config();

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI || 'mongodb+srv://ojafivofi:fyytfjyb7ry6aRop@cluster0.09zwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`Connected To Mongo DB`);
    } catch(error) {
        console.error(`Error Connecting To MongoDB: ${error}`);
    }
}

export default connectToMongoDB