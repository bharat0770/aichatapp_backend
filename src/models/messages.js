import mongoose from "mongoose";

const schema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId, ref: "conversation"
    },
    sender: { type: String, enum: ["user", "ai"] },
    content: { type: String },
},
    {
        timestamps: true
    }
)

const Message = mongoose.model("message", schema);
export default Message; 
