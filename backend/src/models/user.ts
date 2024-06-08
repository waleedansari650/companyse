import mongoose from 'mongoose';

const userSchema =  new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Name is required"]         
    },
    
    email : {
        type:  String,
        required : [true, "Email is required"],
        lowercase : true,
        trim  : true, 
        unique : true,
             
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : 6,
        trim  : true,   
    },
    role: {
        type: String,
        default: "client" // Default role is set to "client"
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
})
const User = mongoose.model('User', userSchema);
export default User;
