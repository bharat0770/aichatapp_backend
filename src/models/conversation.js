import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
},
    {
        timestamps: true
    })

const Conversation = mongoose.model("conversation", schema);
export default Conversation;
