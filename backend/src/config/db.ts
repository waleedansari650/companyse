import mongoose from 'mongoose';
require('dotenv').config();

 const connection = async () => {
    try {
      const response =   await mongoose.connect(process.env.DATABASE_URL as string);
        if(response){
            console.log("Database is connected successfully");
        }
    
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}
export default connection;

