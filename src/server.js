import "./util/dotenvloader.js"
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"; 
import conversationRoutes from "./routes/conversation.js"; 
import messageRoutes from "./routes/message.js"; 
import cors from "cors"; 

const app = express();
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173',
    
}));

console.log(process.env.HUGGINGFACE_API_KEY); 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/conversation", conversationRoutes);
app.use("/api/v1/message", messageRoutes);

app.get("/", async(req,res) =>{
    try {
        res.send("hello"); 
    } catch (error) {
        res.send(error.message);
    }
}); 
app.listen(3000, async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/aichat"); 
        console.log("db connected")
        
    } catch (error) {
        console.log(error.message)
    }
})
