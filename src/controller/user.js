import User from "../models/user.js";

export const register = async(req, res) => {
    const {email, password} = req.body; 
    const response = await User.create({email, password}); 
    try {
        res.status(200).json({
            success : true, 
            data  : response  
        });  
    } catch (error) {
        res.status(500).json({
            success : false, 
            data  : error.message  
        }); 
    }
}

export const login = async(req, res) => {

    const {email, password} = req.body; 
    
    const user = await User.findOne({email}); 
    
    if(!user){
        throw new error("user not found"); 
    }
     if(user.password !== password){
        throw new error("invalid user credentials"); 
    }
    try {
        res.status(200).json({
            success : true, 
            data  : user  
        });  
    } catch (error) {
        res.status(500).json({
            success : false, 
            data  : error.message  
        }); 
    }
}
