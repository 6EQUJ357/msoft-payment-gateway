import React from 'react'
import Reusenavbar from './reusenavbar'
import Sidebar from '../components/sidebar'
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/footer';
import axios from 'axios';

import "../../App.css"
import API_BASE_URL from '../components/config';





const ReuseServiceFormDetails = (params) => {

    let navigate = useNavigate();

    const location = useLocation();
    const serviceFormData = location.state;


    //send to server as draft
    const sendToServer = async(data)=>{

        await axios.post(`${API_BASE_URL}/draftserviceform`, data).then(res=>{
                alert(res.data.message);
    
                if(res.data.status === 200){
                    navigate('/dashboard');
                }
            }
                ).catch(err=>console.log(err))
    }


    //handle Payment Gateway

    const handlePaymentGateway = async(data)=>{
       // alert("Payment Was Done...");
        //console.log("payment", data)

        await axios.post(`${API_BASE_URL}/submitserviceform`, data).then(res=>{
            alert(res.data.message);

            if(res.data.status === 200){
                navigate('/dashboard');
            }
        }
            ).catch(err=>console.log(err))
    }

    

    const handleOpenRazorpay =(data, orderData)=>{

        const options = {
            key: "rzp_test_wbdrlnl8sa0FNK", 
            amount: data.amount, 
            currency: data.currency,
            name: (orderData.serviceType === "others") ? orderData.otherservicetype : orderData.serviceType,
            description: orderData.requirementdetails,
            image: "https://www.simplepayments.in/assets/img/intro.jpg",
            order_id: data.id, 
            handler: function (response){
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                //console.log(response);
                axios.post(`${API_BASE_URL}/verifypayment`, {response : response, orderData : orderData}).then(res=>{
                    alert(res.data.message); 

                    if(res.data.status === 200){
                        navigate('/successpayment', {state : res.data.data});
                    }
                }).catch(err=>console.log(err))
            },
            prefill: {
                name: orderData.clientname,
                email: orderData.clientemail,
                contact: orderData.clientmobilenumber
            },
            notes: {
                address: orderData.clientaddress
            },
            theme: {
                color: "#3399cc" 
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();

        rzp1.on('payment.failed', function (response){
                // alert(response.error.code);
                alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
                
        });
       


    }



    const handlePaymentGatewayWithRazorpay = async(data)=>{
        // alert("Payment Was Done...");
         //console.log("payment", data)
 
         await axios.post(`${API_BASE_URL}/paymentgateway`, data).then(res=>{

            if(res.data.status === 500){
             alert(res.data.message);
            }

            console.log(res.data.message);

             handleOpenRazorpay(res.data.data, res.data.orderData);

         }
             ).catch(err=>console.log(err))
     }


   
  return (
    <div>
            {/* Begin page */}
    <div id="layout-wrapper">

     <Reusenavbar value1 ={params.value1} value2 = {params.value2} value3 = {params.value3}/>


{/* removeNotificationModal */}
<div id="removeNotificationModal" className="modal fade zoomIn" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
            </div>
            <div className="modal-body">
                <div className="mt-2 text-center">
                    <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{width:"100px",height:"100px"}}></lord-icon>
                    <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                        <h4>Are you sure ?</h4>
                        <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                    </div>
                </div>
                <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                    <button type="button" className="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn w-sm btn-danger" id="delete-notification">Yes, Delete It!</button>
                </div>
            </div>

        </div>{/* /.modal-content */}
    </div>{/* /.modal-dialog */}
</div>{/* /.modal */}
        {/* ========== App Menu ========== */}
        <div className="app-menu navbar-menu">
            {/* LOGO */}


            {/* sidebar start */}
            <Sidebar value1={params.value1} value2 = {params.value2} value3={params.value3}/>
            {/* sidebar end */}

        </div>
        {/* Left Sidebar End */}
        {/* Vertical Overlay*/}
        <div className="vertical-overlay"></div>

        {/* ============================================================== */}
        {/* Start right Content here */}
        {/* ============================================================== */}
        <div className="main-content">

            <div className="page-content">
                <div className="container-fluid">

                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Service Form Details</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a">service Form</a></li>
                                        <li className="breadcrumb-item active">Service Form Details</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    
                    {/* <div className="row pb-4 gy-3">
                        <div className="col-sm-4">
                            <Link to="/invoice" className="btn btn-primary addMembers-modal"><i className="las la-plus me-1"></i>Go To Invoice</Link>
                        </div>
                    </div> */}

                        {/* invoice data generation */}


                    
                     <div className="row justify-content-center">
                     <div className="col-xxl-9">
                         <div className="card" id="demo">
                                <div className="card-body">

                                {params.value3 &&
                                        <div className='row p-4'>    

                                            <div className="col-lg-4 col-4">

                                                <div className="mt-sm-0 mt-3">
                                                    <div className="mb-4">
                                                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`}  className="card-logo card-logo-dark c_profile_img c_profile_addinvoicedetails_img" alt="logo dark"/>
                                                        {/* <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black", textTransform : "capitalize"}} >{params.value3?.[0].company_name}</span> */}

                                                        {/* <img src={params.value3?.[0].company_logo}  className="card-logo card-logo-light" alt="logo light" height="80" /> */}
                                                        {/* <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black", textTransform : "capitalize"}} >{params.value3.company_name}</span> */}                                       
                                                    </div>
                                                     
                                                </div>

                                            </div>

                                            <div className="col-lg-4 col-4">
                                                <div className="mt-sm-0 mt-3">
                                                    <p> <span className='c_profile_invoicedetaikls_name '>{params.value3[0]?.company_name}</span></p>
                                                    {/* <p className="text-muted mb-1" id="zip-code"><span>GST No : </span> {params.value3[0]?.GST_No}</p> */}
                                                    <p className="c_profile_invoicedetaikls_name" id="address-details">{params.value3[0]?.address}</p>


                                                </div>
                                            </div>

                                            <div className="col-lg-4 col-4">
                                                <div className="mt-sm-0 mt-3">
                                                {/* <h6 className="text-muted text-uppercase fw-semibold">Address</h6> */}
                                                    
                                                    <h6><span className="text-muted fw-normal">GST No : </span><span id="email">{params.value3[0]?.GST_No}</span></h6>
                                                    <h6><span className="text-muted fw-normal">Email : </span><span id="email">{params.value3[0]?.email}</span></h6>
                                                    {/* <h6><span className="text-muted fw-normal">Website:</span> <a href="https://themesbrand.com/" className="link-primary" rel='noreferrer' target="_blank" id="website">www.themesbrand.com</a></h6> */}
                                                    <h6 className="mb-0"><span className="text-muted fw-normal">Contact No : </span><span id="contact-no">{params.value3[0]?.mobile_No}</span></h6>
                                                </div>
                                            </div>
                                                    
                                        
                                        
                                        </div>
                                    }

                                    {serviceFormData &&
                                 <div className="row p-4">


                                    <div className='col-lg-4 col-12'>Application No</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.applicationno}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Application Date</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.dateofpurchase}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Client Name</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.clientname}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Client Address</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.clientaddress}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Email</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.clientemail}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Mobile Number</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.clientmobilenumber}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Service Type</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0 ">
                                            {serviceFormData.serviceType}
                                        </div>

                                        {serviceFormData.serviceType === "others" &&
                                            <div className="form-control bg-light border-0">
                                                {serviceFormData.otherservicetype}
                                            </div>
                                        }
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Requirement Details</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.requirementdetails}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>dominetype</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.dominetype}
                                        </div>
                                        <hr style={{width:"50%"}}/>

                                        {serviceFormData.existdominename &&
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.existdominename}
                                        </div>
                                        }

                                        {serviceFormData.newdominename &&
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.newdominename}
                                        </div>
                                        }
                                  
                                    </div>


                                    {/* <div className='col-lg-4 col-12'>Advanced Payment</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {serviceFormData.advancedpayment}
                                        </div>
                                  
                                    </div> */}
                                    
                                 </div>
                                 }


                                 {/*end col*/}

                                

                                 <div className="row">
                                     <div className="col-lg-12">
                                        <div className="card-body p-4">
                                            
                                             
                                             <div className="mt-3">
                                                 <h6 className="text-muted text-uppercase fw-semibold mb-3">Payment Details:</h6>

                                                 <div className='row'>
                                                    <div className='col-lg-4 col-12'>Advanced Payment</div>
                                                    <div className='col-lg-8 col-12 mb-3'>
                                                        <div className="form-control bg-light border-0">
                                                            {serviceFormData.advancedpayment}
                                                        </div>
                                                    </div>

                                                 
                                  
                                                </div>
                                            </div>
                                            
                                            <div className="hstack gap-2 justify-content-end d-print-none mt-4">

                                                    {(serviceFormData.enablesavedraftbutton && serviceFormData.enablesavedraftbutton === "enable") &&                            
                                                    <button className="btn btn-primary" onClick={()=>sendToServer(serviceFormData)}><i className="ri-draft-line align-bottom me-1"></i>Save As Draft</button>
                                                     } 
                                                    {/* <button className="btn btn-info" onClick={()=>handlePaymentGateway(serviceFormData)}><i className="ri-secure-payment-line align-bottom me-1"></i>Payment</button> */}

                                                    <button className="btn btn-info" onClick={()=>handlePaymentGatewayWithRazorpay(serviceFormData)}><i className="ri-secure-payment-line align-bottom me-1"></i>Payment With RazorPay</button>
                                                                                                                        
                                            </div>
                                        </div>
                                         {/*end card-body*/}
                                     </div>{/*end col*/}
                                 </div>
                                </div>
                         </div>
                     </div>
                     {/*end col*/}
                 </div>
                      
                    
                        
                    

                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}

            <Footer value3 ={params.value3}/>
        </div>
        {/* end main content*/}

    </div>
    {/* END layout-wrapper */}




    {/*start back-to-top*/}
    <button onclick="topFunction()" className="btn btn-danger btn-icon" id="back-to-top">
        <i className="ri-arrow-up-line"></i>
    </button>
    {/*end back-to-top*/}

    {/* preloader
    <div id="preloader">
        <div id="status">
            <div className="spinner-border text-primary avatar-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div> */}

    
    </div>
  )
}

export default ReuseServiceFormDetails