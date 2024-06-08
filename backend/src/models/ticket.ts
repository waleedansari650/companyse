import mongoose from 'mongoose';

const ticketSchema =  new mongoose.Schema({
    name: {
        type : String,
        required : [true, "Name is required"]         
    },
    phone : {
        type : String,
        required : [true, "Phone number is required"],
        trim : true,

    },
    email : {
        type:  String,
        required : [true, "Email is required"],
        lowercase : true,
        trim  : true,        
    },
    projectLink : {
        type :  String,
        required : [true, "Project link is required"],
    },
    projectDetails : {
        type : String,
        required : [true, "Project details is required"],
    },
    issueArise : {
        type : String,
        required : [true, "Issue arrise is required"],
    },
    projectCredentials : {
        type : String,
        required : [true, "Project credentials is required"],
    },
    timeStamp : {
        type : Date,
        default : Date.now
    }
})
const Ticket = mongoose.model('Ticket', ticketSchema);
export default Ticket;
