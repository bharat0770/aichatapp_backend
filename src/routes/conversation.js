import {Router} from "express"; 
import { createConvo, getConvo, updateConversation } from "../controller/coversation.js";
const router  = Router(); 

router.post("/create", createConvo); 
router.get("/all", getConvo); 
router.put("/one", updateConversation); 


export default router;