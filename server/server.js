let express = require("express")
let mongoose = require("mongoose")
let cors = require("cors")
let jwt = require("jsonwebtoken")
let middleware1 = require("./middleware1")
const multer = require('multer');
let path = require("path")
let bcrypt = require("bcrypt")
require("dotenv").config();
let nodemailer = require("nodemailer");

const Razorpay = require('razorpay');
const crypto = require("crypto"); 


//import transporter
const transporter = require("./emailConfig");
 

 

//.ENV
const port = process.env.PORT ||8080; 
const DB_connection = process.env.DB_CONNECTION;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const EMAIL_USER = process.env.EMAIL_USER;

const KEY_ID = process.env.KEY_ID 
const KEY_SECRET = process.env.KEY_SECRET
const CLINET_PORT = process.env.CLINET_PORT

//const SERVER_IP_ADDRESS = "103.86.177.194"  

//Db modal schema
let mcreate = require("./model1");
let DraftServiceFormModel = require("./DraftServiceFormModel");
let SubmitServiceFormModel = require("./SubmitServiceFormModel")
let company_profileModel = require("./company_profileModel");
let CategoryModel = require("./categoryModel");
let PaymentDetailsModel = require("./paymentDetailsModel");
let OrderDetailsModel = require("./orderDetailsModel");
//capturing img schema


  
let app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use(cors({origin:"*"})) 


mongoose.connect(DB_connection, {        
    useNewUrlParser: true, 
    useUnifiedTopology: true,
  }).then(()=>console.log("DB Authentication success...")).catch(err=>console.log(err))


app.get("/",(req,res)=>{
    res.send("node js...")  
})


//create user
//create user

// user details 

//multer image store in a images file

app.use("/UserImages", express.static("UserImages"))

const userStorage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'UserImages'); 
    },
    filename: (req, file, cb)=> {
        //console.log(file)
      cb(null, Date.now() + path.extname(file.originalname)); 
    } 
  }); 


  //image file type  check
  const userImgfilter = (req, file, cb) => { 
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, "Only image files are allowed");
    }
  };
  
  const userUpload = multer({ storage: userStorage, filefilter: userImgfilter });
  //multer image store in a images file end
 

 
app.post("/muser",userUpload.single("userimg"), async(req,res)=>{
    try{
        const {username, email, mobilenumber, address, password, clientIPaddress} = req.body;


        let images;
        if( req.body.userimg === 'null'){
            images = null
        }
        else{
            images = req.file.filename;
        }


        let exist = await mcreate.findOne({email:email})
        if(exist){
            return res.json({status:400, response : false, message:"user already exist for this Email"})
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Generate bcrypt password hash
        const hashedPassword = await bcrypt.hash(password, salt);

       
        //let data = new mcreate({userimg : images, username, userType : "super Admin", email, password : hashedPassword, clientIPaddress})
        let data = new mcreate({userimg : images, username, userType : "user", email, mobilenumber, address, password : hashedPassword, clientIPaddress})
        await data.save();


        //send email

        let options = {
            from: EMAIL_USER,  
            to: EMAIL_USER, 
            subject:`New Form Submission from ${username}`, 
            html:
            `
            <h1>Hello, You got a new message from  ${username}</h1>           
            <p>email : ${email}</p>
            <p>${clientIPaddress}</p>
            `
        }

        await transporter.sendMail(options, (err, info)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("sent", info.response)
            }
        })

   
        let replayOption = {
            from: EMAIL_USER ,
            to:`${email}`  , 
            subject:'from Msoft',
            html:
            `  
            <h1> Hi ${username} </h1>
            <p>Thank you For Your Interest.</p>
            <p>Your Account Created Successfully, please login to Your Account to continue our services...</p>
            <p>Click the Button below for Booking Service</p>
            <a href= "${CLINET_PORT}" style="display : inline-block; padding: 10px 20px; background-color : #007bff; color : #fff; text-decoration : none; border-radius : 5px;">Book Service</a>
            

            <address> 
            <p>Regards</p> <br />
            <p>Msoft Team</p>
            </address> 
            `
        } 

        //send a replay email to user
        await transporter.sendMail(replayOption, (err, info)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("sent", info.response)
            }
        })

        return res.json({status:200, response : true, message:`Account Created successfully... `}) 

    } 
    catch(err){
        console.log(err)
        return res.send({status:500, message:"internal server error line:134"})  
    }
})
 


//reset password

app.put("/resetpassword/:id", async(req, res)=>{
    try{
        const {email, password} = req.body;

        let exist = mcreate.findOne({email : email});
        //console.log("wdefe", exist)
        if(!exist){
            return res.json({status:400, response : false, message:"user not found..."})
        } 
       
         // Generate a salt
         const salt = await bcrypt.genSalt(10);

         // Generate bcrypt password hash
         const hashedPassword = await bcrypt.hash(password, salt);

         await mcreate.findByIdAndUpdate(req.params.id, { 
            password : hashedPassword 
        }, {new : true})
        .then(updatedUser => {
            if (!updatedUser) { 
              return res.json({status : 400, message: 'Error While Update  Client' });
             }
             return res.send({status: 200, message: "Password Reset successsfull..."}); 
           });

    }catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})




//get all users include admin
app.get("/getallusers", async(req,res)=>{
    try{
        return res.status(200).json(await mcreate.find().select('-password').exec())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete user
app.delete("/deleteuserdetails/:id", async(req,res)=>{
    try{
        await mcreate.findByIdAndDelete(req.params.id);

        return res.status(200).json(await mcreate.find())
   }
   catch(err){
       console.log(err)
       return res.status(500).send("internal server error...")
   }
})


//edit user details


app.put("/edituserdetails/:id",userUpload.single("userimg"), async(req,res)=>{
    try{
        const {editusername, edituseremail, editmobilenumber, editaddress} = req.body; 

        let images;
        if( req.body.userimg === 'null'){
            images = null
        }
        else{
         //images =req.protocol + '://' + req.get('host') + '/UserImages/' + req.file.filename;
         images = req.file.filename;
        }

    //     // Generate a salt
    // const salt = await bcrypt.genSalt(10);

    // // Generate bcrypt password hash
    // const hashedPassword = await bcrypt.hash(edituserpassword, salt);

        await mcreate.findByIdAndUpdate(req.params.id, {
            userimg : images,
            username : editusername,
            email : edituseremail,
            mobileNumber: editmobilenumber ,
            address: editaddress
        }, {new : true})
        .then(updatedUser => {
            if (!updatedUser) { 
              return res.status(404).json({ message: 'Error for Update  Client' });
             }
             return res.send({status: 200, message: "User Profile Updated successsfull..."}); 
           });
         
         
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//edit admin details
app.put("/editadmindetails/:id",userUpload.single("userimg"), async(req,res)=>{
try{
    const {username, email, mobilenumber, address} = req.body; 

    let images;
     if( req.body.userimg === 'null'){
         images = null
     }
     else{
    images = req.file.filename;
     }


    await mcreate.findByIdAndUpdate(req.params.id, {
        userimg : images,
        username : username,
        email : email,
        mobilenumber : mobilenumber,
        address : address
       
    }, {new : true})
    .then(updatedUser => {
        if (!updatedUser) { 
          return res.status(404).json({ message: 'Error for Update  Client' });
         }
         return res.send({status: 200, message: "Admin Profile Updated successsfull..."});
       });
     
     
}
catch(err){
    console.log(err)
    return res.status(500).send("internal server error...")
}
})

//signin user

app.post("/signin", async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password) {
            return res.send({status:400, message:"Fill the Fields First..."})
        }

        let exist = await mcreate.findOne({email:email})

        
        if(!exist){
            return res.send({status:400, message:"Invalid Email..."})
        }
         // Compare bcrypt hash of password and signin password
         const passwordMatch = await bcrypt.compare(password, exist.password);   
         //console.log("first", password, exist.password);  

         if (!passwordMatch) {
             return res.json({status : 400, response : false, message: 'Invalid Password Credential' }); //Passwords do not match
             }

         
        //json web token
        let payload = {
            user : {
                id : exist.id 
            }
        }
        jwt.sign(payload, JWT_SECRET_KEY, {expiresIn:"1d"}, (err,token)=>{  
            if(err) {
                console.log(err)
            }
            return res.json({status:200, token:token, message:"login successfully.."}) //send token

        })


    }
    catch(err){
        console.log(err) 
        return res.send({status:500, message:"internal server error line:87"})
    } 
})


//company profile


//multer image store in a images file

app.use("/companyprofileimg", express.static("companyprofileimg"))

const companyprofile_storage = multer.diskStorage({
    destination: (req, file, cb)=> {
      cb(null, 'companyprofileimg');  
    },
    filename: (req, file, cb)=> {
        //console.log(file)
      cb(null, Date.now() + path.extname(file.originalname)); 
    } 
  });

  //image file type  check
  const companyprofile_filefilter = (req, file, cb) => {
    if ( 
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, "Only image files are allowed");
    }
  };
  
  const companyprofile_upload = multer({ storage: companyprofile_storage, filefilter: companyprofile_filefilter });
  //multer image store in a images file end


app.post("/companyprofile",companyprofile_upload.single("company_logo"), async(req, res)=>{
    try{
        const {company_name, GST_No, mobile_No, email, address} = req.body;
        console.log("first", req.body)

        let images;
         if( req.body.company_logo === 'null' || ""){
             images = null
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/companyprofileimg/' + req.file.filename;
        images = req.file.filename;
         }
 


        let exist = await company_profileModel.findOne({email:email})  
       
        if(exist){
            return res.send({status:400, message:"profile already exist for this Email"})
        }

        let data = new company_profileModel({company_name, GST_No, mobile_No, email, address, company_logo : images})
        await data.save();

        return res.json({status:200, message:"create profile successfully... "}) 
        

    }
    catch(err){
        console.log(err)
        return res.send({status:500, message:"internal server error line:44",})  
    }
})

//get company profile list

app.get("/getcompanyprofile",async(req,res)=>{
    try{
        
        return res.status(200).json(await company_profileModel.find())
     }
     catch(err){
         console.log(err)
         return res.status(500).send("internal server error...")
     }
})

//update company profile data
//edit product list


app.put("/updatecompanyprofiledata/:id",companyprofile_upload.single("company_logo"),async(req,res)=>{
    try{
    
         const userId = req.params.id;
         const {company_name, GST_No, mobile_No, email, address} = req.body;
          
         

         let images;
         if(req.body.company_logo === '' || null){ 
             images = null
         }
         else{
        //   images =req.protocol + '://' + req.get('host') + '/companyprofileimg/' + req.file.filename;
        images = req.file.filename
         }


          await company_profileModel.findByIdAndUpdate(userId, { company_name, GST_No, mobile_No, email, address, company_logo : images}, {new:true})
         .then(updatedUser => {
            if (!updatedUser) { 
              return res.status(404).json({ message: 'User not found' });
             } 
             return res.json({status: 200, message: "Profile Updated successsfull..."});  
           })
              
    }
    catch(err){
        console.log(err)
        return res.json({status:500, message:"internal server error line:407"})
    }
 })
//delete company profile data

app.delete("/deletecompanyprofiledata/:id",async(req,res)=>{
    try{
        await company_profileModel.findByIdAndDelete(req.params.id)

        return res.status(200).json(await company_profileModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
}) 


//all protected routes

app.get(["/dashboard", "/edituser", "/companyprofile", "/companyprofiledata", "/editcompanyprofiledata", "/saveddraftserviceform", "/savedsubmitserviceform", "/viewdetails", "/serviceform", "/serviceformdetails", "/users", "/viewcompanyprofiledata","/viewuser", "/categories", "/resetpassword", "/paymentdetails", "/viewpaymentdetails", "/orderdetails", "/successpayment"], middleware1, async(req,res)=>{
    try{
        let exist = await mcreate.findById(req.user.id)
        if(!exist){ 
            return res.send({status:400, message:"user not found"}) 
        }
        // Exclude the password field from the user object
        const userWithoutPassword = { ...exist.toObject() };
        delete userWithoutPassword.password;
 
    // Send the user data without the password field to the front end
    return res.status(200).json(userWithoutPassword);
     }
     catch(err){
         console.log(err)
         return res.status(500).send("internal server error...")
     }
     

})



//category
app.post("/category", async(req, res)=>{
    try{
        const {producttype} = req.body;
        
        let exist = await CategoryModel.findOne({producttype : producttype});

        if(!exist){
            let saveCategory = new CategoryModel({producttype});

            await saveCategory.save();
            return res.json({status : 200, message:'Service Type Added...'});
        }
        else{
            return res.json({status : 400, message :"Already Exist"});
        }

    }
    catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})


//get category list
app.get("/getcategory", async(req,res)=>{
    try{
        return res.json(await CategoryModel.find())
        
    }
    catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})

//delete category

app.delete("/deletecategory/:id", async(req,res)=>{
    try{
        await CategoryModel.findByIdAndDelete(req.params.id);

        return res.status(200).json(await CategoryModel.find())
    }catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})

//edit category

app.put("/editcategory/:id", async(req, res)=>{
    try{
        const {editproducttype} = req.body;
        //console.log("scfdvfvgb", editproducttype); 

        await CategoryModel.findByIdAndUpdate(req.params.id, {producttype : editproducttype}, {new : true}
            ).then(updatedproducttype => {
                if (!updatedproducttype) { 
                  return res.status(404).json({ message: 'product type not found' });
                 }
                 return res.send({status: 200, message: "Service Type Updated successsfull..."});
               });

    }catch(err){
        console.log(err);
        return res.status(500).send("internal server error...");
    }
})




//add draftserviceform post requerest

app.post("/draftserviceform", async(req,res)=>{
    try{
        let { applicationno, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment} = req.body;

       let exist = await DraftServiceFormModel.findOne({applicationno})

       if(!exist){

        let saveData = new DraftServiceFormModel({applicationno, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment});

        await saveData.save().then(respo=> res.json({status:200, message : "Application Saved To Draft ..."})).catch(err=> console.log(err));
       }
       else{
        return res.json({ststus : 301, message:"Application already submitted For These Application NO."});
       }
       

    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//get draftserviceform transcation data

app.get("/getdraftserviceform", async(req,res)=>{
    try{
        return res.status(200).json(await DraftServiceFormModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete draftserviceform transaction

app.delete("/deletdraftserviceform/:id", async(req,res)=>{
    try{
        await DraftServiceFormModel.findByIdAndDelete(req.params.id);

        return res.json(await DraftServiceFormModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//submitserviceform requerest

app.post("/submitserviceform", async(req,res)=>{
    try {
        const {applicationno, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment} = req.body;

        let exist = await SubmitServiceFormModel.findOne({applicationno});

        if(!exist){

            let saveData = new SubmitServiceFormModel({applicationno, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment});
    
            await saveData.save().then(respo=> res.json({status:200, message : "Application Submitted /Payment was Done Successfully  ..."})).catch(err=> console.log(err));

            //delete serviceform from draft
            let existed = await DraftServiceFormModel.findOne({applicationno});
            // console.log("existed", existed);
            if(existed){
                 await DraftServiceFormModel.findByIdAndDelete(existed._id);
            }

           }
           else{
            return res.json({ststus : 301, message:"Error While Submitting the Application"});
           }

    }
    catch(err){ 
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//get submitserviceform

app.get("/getsubmitserviceform", async(req,res)=>{
    try{
        return res.status(200).json(await SubmitServiceFormModel.find())
    }
    catch(err){ 
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//delete submitserviceform transaction

app.delete("/deletsubmitserviceform/:id", async(req,res)=>{
    try{
        await SubmitServiceFormModel.findByIdAndDelete(req.params.id);

        return res.json(await SubmitServiceFormModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})




//payment gate way

app.post("/paymentgateway", async(req, res)=>{
    try {

        const {applicationno, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment} = req.body;


            let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })

            let options = {
            amount: advancedpayment *100,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
            };
            instance.orders.create(options, function(err, order) {
                if(err){
                    return res.json({status : 500, message : "Server Response Error"})
                }

                //console.log("order", order);
                let orderData = {
                    applicationno : applicationno,
                    dateofpurchase : dateofpurchase,
                    clientname : clientname,
                    clientaddress : clientaddress,
                    clientemail : clientemail,
                    clientmobilenumber : clientmobilenumber,
                    serviceType :serviceType,
                    otherservicetype : otherservicetype,
                    requirementdetails : requirementdetails,
                    dominetype : dominetype,
                    existdominename : existdominename,
                    newdominename : newdominename,
                    advancedpayment : advancedpayment

                }
                return res.json({status : 200, message : "Order Created", data : order, orderData : orderData});
                

            });
    }
    catch(err){ 
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//verify Payment

app.post("/verifypayment", async(req,res)=>{
    try{

        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} =  req.body.response;

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", KEY_SECRET)
                                    .update(body.toString())
                                    .digest("hex");
                                    // console.log("sig received", req.body.response.razorpay_signature);
                                    // console.log("sig generated", expectedSignature);



        if (expectedSignature == razorpay_signature) {

             const {applicationno, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment} = req.body.orderData;

             //generate random id

             let generateRandomId = (length)=>{
                const charWithDigit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                let result = "";

                for(let i=0; i<length; i++){
                    result +=charWithDigit.charAt(Math.floor((Math.random() * charWithDigit.length)));
        
                }        

                return result;
             }

             let service_id = `service_${clientname}${generateRandomId(8)}`;

           

             //details save to submit service form 

            let exist = await SubmitServiceFormModel.findOne({applicationno});

            if(!exist){

                let saveData = new SubmitServiceFormModel({applicationno, service_id, dateofpurchase, clientname, clientaddress, clientemail, clientmobilenumber, serviceType, otherservicetype, requirementdetails, dominetype, existdominename, newdominename, advancedpayment});

        
                // await saveData.save().then(respo=> res.json({status:200, message : "Payment Done Successfully..."})).catch(err=> console.log(err));
                await saveData.save();





                //delete serviceform from draft
                let existed = await DraftServiceFormModel.findOne({applicationno});
                // console.log("existed", existed);
                if(existed){
                    await DraftServiceFormModel.findByIdAndDelete(existed._id);
                }




                //payment details model

                let paymentDetails = new PaymentDetailsModel({applicationno, clientname, clientemail, clientmobilenumber, serviceType, otherservicetype, advancedpayment, service_id, order_id : razorpay_order_id, payment_id : razorpay_payment_id});

                await paymentDetails.save().catch(err=>console.log("saved payment details error", err));


                 //order details model

                 let orderDetails = new OrderDetailsModel({  
                    applicationno,
                    clientname,
                    clientaddress,
                    clientemail,
                    clientmobilenumber,
                    serviceType,
                    otherservicetype,
                    requirementdetails,
                    dominetype,
                    existdominename,
                    newdominename,
                    advancedpayment,
                    service_id,
                    order_id : razorpay_order_id, 
                    payment_id : razorpay_payment_id});

                 await orderDetails.save().catch(err=>console.log("saved order details error", err));
            }
            else{
                return res.json({ststus : 301, message:"Error While Submitting the Application"});
            }

            let existpayment = await PaymentDetailsModel.findOne({applicationno});

               return  res.json({status : 200, message : "Payment Done Successfull", data : existpayment})  //sign Valid


            
        }
        else{
            res.json({status : 400, message : "sign Invalid"})

        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})


//get Payment Details
app.get("/getpaymentdetails", async(req,res)=>{
    try {
        return res.json(await PaymentDetailsModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete deletpaymentDetails

app.delete("/deletepaymentdetails/:id", async(req,res)=>{
    try {
        await PaymentDetailsModel.findOneAndDelete(req.params.id);

        return res.status(200).json(await PaymentDetailsModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})




//get Order Details
app.get("/getorderdetails", async(req,res)=>{
    try {
        return res.json(await OrderDetailsModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})

//delete delete Order Details

app.delete("/deleteorderdetails/:id", async(req,res)=>{
    try {
        await OrderDetailsModel.findOneAndDelete(req.params.id);

        return res.status(200).json(await OrderDetailsModel.find())
    }
    catch(err){
        console.log(err)
        return res.status(500).send("internal server error...")
    }
})



app.listen(port, ()=>console.log(`server is running at port : ${port}...`))