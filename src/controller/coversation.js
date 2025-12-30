import Conversation from "../models/conversation.js";
import Message from "../models/messages.js";
import { generateAiResponse } from "../util/aifunc.js";

export const createConvo = async (req, res) => {
    const {userId, title} = req.body;
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

export const findConvo = async (req, res) => {

    const { email, password } = req.body;
    const user = await Conversation.findOne({ email });
    if (!user) {
        throw new error("user not found");
    }
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
export const getConvo = async (req, res) => {
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

    const { conversationId, userInput } = req.body;

    // const user = await Conversation.findOne({email}); 
    const userMessage = await Message.create({ conversation: conversationId, content: userInput, sender: "user" });
    const aiResponse = await generateAiResponse(userInput);
    const aiOutput = await Message.create({ conversation: conversationId, content: aiResponse || "sorry i cant response", sender: "ai" });
    try {
        res.status(200).json({
            success: true,
            data: [userMessage, aiOutput]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            data: error.message
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
