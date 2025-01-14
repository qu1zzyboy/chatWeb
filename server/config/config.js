import dotenv from 'dotenv';


dotenv.config();

export const MONGO_IP = process.env.MONGO_IP || "mongo";
export const MONGO_PORT = process.env.MONGO_PORT || 27017;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

