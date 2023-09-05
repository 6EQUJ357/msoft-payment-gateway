import React from 'react'
import Reusenavbar from './reusenavbar'
import Sidebar from '../components/sidebar'
import { useLocation, Link } from 'react-router-dom';
import Footer from '../components/footer';

import "../../App.css"
import API_BASE_URL from '../components/config';





const ReuseViewPaymentDetails = (params) => {

    const location = useLocation();
    const viewpaymentdetails = location.state;
    //console.log("viewdetails", viewpaymentdetails)


   
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
                                <h4 className="mb-sm-0">View Payment Details</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href="#a"> Details</a></li>
                                        <li className="breadcrumb-item active">View Payment Details</li>
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

                                    {viewpaymentdetails &&
                                 <div className="row p-4">


                                    <div className='col-lg-4 col-12'>Application No</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.applicationno}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Date Of Payment</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {new Date(viewpaymentdetails.date).toLocaleString()}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Client Name</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.clientname}
                                        </div>
                                  
                                    </div>

                                    {viewpaymentdetails.clientaddress &&
                                    <>
                                        <div className='col-lg-4 col-12'>Client Address</div>
                                        <div className='col-lg-8 col-12 mb-3'>
                                            <div className="form-control bg-light border-0">
                                                {viewpaymentdetails.clientaddress}
                                            </div>
                                    
                                        </div>
                                    </>}


                                    <div className='col-lg-4 col-12'>Email</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.clientemail}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Mobile Number</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.clientmobilenumber}
                                        </div>
                                  
                                    </div>


                                    <div className='col-lg-4 col-12'>Service Type</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0 ">
                                            {viewpaymentdetails.serviceType}
                                        </div>

                                        {viewpaymentdetails.serviceType === "others" &&
                                            <div className="form-control bg-light border-0">
                                                {viewpaymentdetails.otherservicetype}
                                            </div>
                                        }
                                  
                                    </div>


                                    {/* <div className='col-lg-4 col-12'>Requirement Details</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.requirementdetails}
                                        </div>
                                  
                                    </div> */}

                                    {viewpaymentdetails.dominetype && 
                                    <>
                                    <div className='col-lg-4 col-12'>dominetype</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.dominetype}
                                        </div>
                                        <hr style={{width:"50%"}}/>

                                        {viewpaymentdetails.existdominename &&
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.existdominename}
                                        </div>
                                        }

                                        {viewpaymentdetails.newdominename &&
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.newdominename}
                                        </div>
                                        }
                                  
                                    </div>

                                    </>
                                    }


                                    {/* <div className='col-lg-4 col-12'>Advanced Payment</div>
                                    <div className='col-lg-8 col-12 mb-3'>
                                        <div className="form-control bg-light border-0">
                                            {viewpaymentdetails.advancedpayment}
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

                                                 <div className='col-lg-4 col-12'>service_id</div>
                                                    <div className='col-lg-8 col-12 mb-3'>
                                                        <div className="form-control bg-light border-0">
                                                            {viewpaymentdetails.service_id}
                                                        </div>
                                                    </div> 

                                                 <div className='col-lg-4 col-12'>payment_id</div>
                                                    <div className='col-lg-8 col-12 mb-3'>
                                                        <div className="form-control bg-light border-0">
                                                            {viewpaymentdetails.payment_id}
                                                        </div>
                                                    </div>  


                                                    <div className='col-lg-4 col-12'>order_id</div>
                                                    <div className='col-lg-8 col-12 mb-3'>
                                                        <div className="form-control bg-light border-0">
                                                            {viewpaymentdetails.order_id}
                                                        </div>
                                                    </div>  


                                                    <div className='col-lg-4 col-12'>Advanced Payment</div>
                                                    <div className='col-lg-8 col-12 mb-3'>
                                                        <div className="form-control bg-light border-0">
                                                            {viewpaymentdetails.advancedpayment}
                                                        </div>
                                                    </div>                                                
                                  
                                                </div>
                                            </div>
                                            
                                            <div className="hstack gap-2 justify-content-end d-print-none mt-4">

                                                   {viewpaymentdetails.dominetype ? 

                                                    <Link to="/orderdetails" className="btn btn-info" ><i className="ri-arrow-left-fill align-bottom me-1"></i>Back To Order Details</Link>
                                                    :
                                                    <Link to="/paymentdetails" className="btn btn-info" ><i className="ri-arrow-left-fill align-bottom me-1"></i>Back To Payment Details</Link>
                                                   }
                                                                                                                        
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

export default ReuseViewPaymentDetails