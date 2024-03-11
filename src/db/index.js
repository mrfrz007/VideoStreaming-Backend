import dotenv from "dotenv";
import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
dotenv.config({
  path: "./.env",
});
// The URI to connect to the MongoDB cluster
const MONGO_URI  ='mongodb+srv://sayedferaz91:sayedferaz91@cluster0.nnflrsz.mongodb.net';

// The function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to the MongoDB cluster and the specified database
    const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    
    // Log the connection details
    console.log(`\n MongoDb connected : ${connectionInstance.connection.host}`);
  } catch (error) {
    // Log any errors during connection and exit the process
    console.log("MONGODB connection error", error);
    process.exit();
  }
};
export default connectDB;