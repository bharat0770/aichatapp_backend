import { Router } from "express";
import { createConvoversation, getAllConversation, updateConversation } from "../controller/coversation.js";
const router  = Router(); 

router.post("/create", createConvoversation); 
router.get("/all", getAllConversation); 
router.put("/one", updateConversation); 

export default router;