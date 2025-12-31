import { Router } from "express";
import { createMessage, getAllMessages } from "../controller/coversation.js";
const router  = Router(); 

router.post("/create", createMessage); 
router.get("/all", getAllMessages); 

export default router;