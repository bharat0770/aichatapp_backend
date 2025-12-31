import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";
import { generateAiResponse } from "../util/aifunc.js";

export const createConvoversation = async (req, res) => {
    const { userId, title } = req.body;
    const response = await Conversation.create({ user: userId, title: title });
    try {
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        });
    }
}


export const getAllConversation = async (req, res) => {
    const { email } = req.query;
    const response = await Conversation.find().populate("user");
    let conversations = response?.filter((i) => i.user.email == email);
    try {
        res.status(200).json({
            success: true,
            data: conversations,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        });
    }
}

export const createMessage = async (req, res) => {

    try {

        const { conversationId, userInput } = req.body;
        // const user = await Conversation.findOne({email}); 
        const aiResponse = await generateAiResponse(userInput);
        const userMessage = await Message.create({ conversation: conversationId, content: userInput, sender: "user" });
        const aiOutput = await Message.create({ conversation: conversationId, content: aiResponse || "sorry i cant response", sender: "ai" });
        res.status(200).json({
            success: true,
            data: [userMessage, aiOutput]
        });
    } catch (error) {
        console.error("AI Error:", error);
        let status, message;

        if (error.status === 401) {
            status = 401;
            message = "Authentication error. Please check API key.";
        }
        else if (error.status === 429) {
            status = 429;
            message = "Rate limit exceeded. Please try again later.";
        }
        else if(error.status == 455){
            status = 455;
            message = "Please keep prompt length > 200 characters";
        }
        else if (error.status >= 500) {
            status = 500;
            message = "AI service is temporarily unavailable.";
        }
        else {
            status = 500;
            message = "Something went wrong. Please try again later.";
        }

        res.status(status).json({
            success: false,
            data: message
        });
    }
}


export const getAllMessages = async (req, res) => {

    const { conversationId } = req.query;

    // const user = await Conversation.findOne({email}); 
    const response = await Message.find({ conversation: conversationId });
    try {
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        });
    }
}


export const updateConversation = async (req, res) => {
    const { conversationId } = req.query;
    const { newTitle } = req.body;

    // const user = await Conversation.findOne({email}); 
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) throw new error("conversation not found");

    conversation.title = newTitle;
    const response = await conversation.save();

    try {
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
        });
    }
}
