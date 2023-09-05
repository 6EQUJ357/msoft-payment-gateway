let nodemailer = require("nodemailer");
require("dotenv").config();


let EMAIL_HOST = process.env.EMAIL_HOST;
let EMAIL_PORT = process.env.EMAIL_PORT;
let EMAIL_USER = process.env.EMAIL_USER;
let EMAIL_PASS = process.env.EMAIL_PASS

//create transport

const transporter = nodemailer.createTransport({
    service: EMAIL_HOST,
    auth:{
        user : EMAIL_USER,
        pass : EMAIL_PASS 
    }
})

module.exports = transporter;