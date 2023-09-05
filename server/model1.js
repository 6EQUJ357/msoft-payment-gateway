let mongoose = require("mongoose")

// change to mcreate users
let mcreate = new mongoose.Schema({
    userimg : {
        type:String,
        require:true
    },
    username : {
        type:String,
        require:true
    },
    userType : {
        type:String,
        require:true
    }, 
    email : {
        type:String,
        require:true,
        unique:true
    },
    mobilenumber : {
        type:String,
        require:true
    },
    address : {
        type: String ,
        require: true
    },
    password : {
        type:String,
        require:true
    },
    clientIPaddress : {
        type:String,
        require:true
    },
    date : {
        type:Date,
        default:Date.now
    }
})
 
module.exports = mongoose.model("mcreate", mcreate)