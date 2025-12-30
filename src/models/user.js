import mongoose from "mongoose"; 
const schema = new  mongoose.Schema({
email  : {type : String}, 
password  : {type : String}    

})
const User =  mongoose.model("user",schema);
export default User;
