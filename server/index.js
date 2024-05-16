import express from "express";
import cors from "cors"
import mongoose from "mongoose"
import authRoutes from "./routes/auth.js"
import {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
} from "./config/config.js"
const MONGO_URL = (`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
const connectWithRetry = () => {
    mongoose.connect(MONGO_URL)
        .then(() => {
            console.log("Successfully connected to DB")
        }).catch((e) => {
            console.log(e)
            setTimeout(connectWithRetry, 5000)
        })
}
connectWithRetry();
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on ${process.env.PORT}`)
})
