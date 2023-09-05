let mongoose = require("mongoose");

let OrderDetailsModel = new mongoose.Schema({
    applicationno : {
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
    service_id : {
        type : String,
        require : true
    },
    order_id : {
        type : String,
        require : true
    },
    payment_id : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("OrderDetailsModel", OrderDetailsModel)