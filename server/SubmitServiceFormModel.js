let mongoose = require("mongoose");

let SubmitServiceFormModel = mongoose.Schema({
    applicationno : {
        type : String,
        require : true
    },
    service_id : {
        type : String,
        require : true
    }, 
    dateofpurchase : {
        type : String,
        require : true
    }, 
    clientname : {
        type : String,
        require : true
    }, 
    clientaddress : {
        type : String,
        require : true
    }, 
    clientemail : {
        type : String,
        require : true
    }, 
    clientmobilenumber : {
        type : String,
        require : true
    }, 
    serviceType : {
        type : String,
        require : true
    }, 
    otherservicetype : {
        type : String,
        require : true
    }, 
    requirementdetails : {
        type : String,
        require : true
    }, 
    dominetype : {
        type : String,
        require : true
    }, 
    existdominename : {
        type : String,
        require : true
    },
    newdominename : {
        type : String,
        require : true
    }, 
    advancedpayment : {
        type : String,
        require : true
    },
    dateofpurchase : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("SubmitServiceFormModel", SubmitServiceFormModel)