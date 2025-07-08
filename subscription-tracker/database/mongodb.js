import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if(!DB_URI){
    throw new Error('DB URI is not defined')
}

//connect to mongodb
const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URI);
        console.log(`Connected to database in ${NODE_ENV} mode`);
        
    } catch(error) {
        console.log('Error connecting to the databse', error);
        process.exit(1);
    }
}

export default connectToDatabase
