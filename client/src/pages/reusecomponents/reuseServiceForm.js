import React, {useEffect, useState} from 'react'
import Reusenavbar from './reusenavbar'
import Sidebar from '../components/sidebar'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import Footer from '../components/footer'
import "../../App.css"


import API_BASE_URL from "../components/config";


const ReuseServiceForm = (params) => {

    const navigate = useNavigate();

    //present date
  const date = new Date();
  const dateTimeString = date.toLocaleString();

  

      const [serviceData, setservicedata] = useState([]);

      const [draftdata, setdraftdata] = useState([]);

      const applicationid = [...serviceData,...draftdata]
      //console.log("weuhwefjdfvjfbkb", Math.max.apply(Math, applicationid.map(list=>list.applicationno)));

      //servicecategory

      const [servicecategory, setservicecategory] = useState([]);




      useEffect(()=>{

        axios.get(`${API_BASE_URL}/getcategory`).then(res=>setservicecategory(res.data)).catch(err=>console.log(err));

        axios.get(`${API_BASE_URL}/getdraftserviceform`).then(res=>setdraftdata(res.data)).catch(err=>console.log(err));
        axios.get(`${API_BASE_URL}/getsubmitserviceform`).then(res=>setservicedata(res.data)).catch(err=>console.log(err));

       },[])
 



  const formik = useFormik({
    initialValues : {
        applicationno : "",
        dateofpurchase : dateTimeString,
        clientname : "",
        clientaddress : "",
        clientemail : "",
        clientmobilenumber : "",
        serviceType : "",
        otherservicetype : "",
        requirementdetails : "",
        dominetype : "",
        existdominename : "",
        newdominename : "",
        advancedpayment : "",
        enablesavedraftbutton : "enable"
        
    },
    validationSchema : Yup.object({
         
        clientmobilenumber : Yup.string().required("Mobile Number Required").length(10, "Mobile Number Must Be 10 Digits"),
        clientemail : Yup.string().required("Address Required").email("Invalid Email"),
        serviceType : Yup.string().required("Specify Service Type"),
        advancedpayment : Yup.string().required("Enter Amount")
    }),
    onSubmit :async(values, {resetForm})=>{
        //console.log("form values", values);

         if(values.applicationno && values.clientmobilenumber && values.clientemail){
            navigate("/serviceformdetails", {state : values});
         }

    }
    
})


//handleservice type

const handleservicetype = (e)=>{
    formik.setFieldValue("serviceType", e.target.value);
    formik.setFieldValue("otherservicetype", "");
    formik.setFieldValue("applicationno", (serviceData.length || draftdata.length) > 0 ? ((Math.max.apply(Math, applicationid.map(list=>Number(list.applicationno)))) + 1).toString()  : "5000")

    if(e.target.value === "others"){
        
        formik.setFieldValue("otherservicetype", "");
    }
    
}

//handleExistred Domine

const handleExistredDomine  = (e)=>{
    formik.setFieldValue("existdominename", e.target.value);
    formik.setFieldValue("newdominename", "");


}

//handleNew Domine

const handleNewDomine = (e)=>{
    formik.setFieldValue("newdominename", e.target.value);
    formik.setFieldValue("existdominename", "");

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
                                <h4 className="mb-sm-0">Application Form</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a href='#a'>Application</a></li>
                                        <li className="breadcrumb-item active">New Application</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}

                    <div className="row justify-content-center">
                        <div className="col-xxl-12">
                            <div className="card">

                                <form className="needs-validation" id="invoice_form" onSubmit={formik.handleSubmit}  autoComplete='off'>
                                    <div className="card-body border-bottom border-bottom-dashed p-4">
                                        <div className="row">

                                            <div className='row'>
                                            <div className='col-lg-4 col-0'></div>
                                                <div className='col-lg-4 col-12'>
                                            {params.value3 && 
                                                    <div className="profile-user mx-auto  mb-3">
                                                        {/* <input id="profile-img-file-input" type="file" className="profile-img-file-input" /> */}

                                                        <label htmlFor="profile-img-file-input" className='addinvoice_lable'  tabIndex="0" style={{width:"20rem"}}>
                                                            
                                                            <span className="overflow-hidden  d-flex align-items-center justify-content-left rounded" >

                                                                <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`}  className="card-logo card-logo-dark user-profile-image img-fluid  c_profile_addinvoice_img" alt="logo dark" />
 
                                                                <span className='c_profile_name c_profile_addinvoice_name' >{params.value3[0]?.company_name}</span>
                                                                
                                                                {/* <img src={params.value3?.[0].company_logo} className="card-logo card-logo-light user-profile-image img-fluid" alt="logo light" /> */}
                                                            </span>
                                                        </label>
                                                    </div>
                                                }
                                                </div>
                                                <div className='col-lg-4 col-0'></div>
                                            </div>
                                            
                                            <div className="col-lg-12 col-12">
                                                <div className="row g-3">

                                                <lable className='col-lg-4 col-12' htmlFor="quotationnoInput">Application No</lable>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <input type="text" className="form-control bg-light border-0" id="quotationnoInput" placeholder="Application No" name="applicationno"  readOnly = "readonly" value={(serviceData.length || draftdata.length) > 0 ? ((Math.max.apply(Math, applicationid.map(list=>Number(list.applicationno)))) + 1).toString()  : "5000"} />
                                                
                                                </div>


                                                <label className='col-lg-4 col-12' htmlFor="date-field">Date</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <input type="text" className="form-control bg-light border-0 flatpickr-input" id="date-field" data-provider="flatpickr" data-time="true" placeholder="Select Date-time" name ="dateofpurchase" readOnly = "readonly"  {...formik.getFieldProps("dateofpurchase")}/> 
                                                </div>


                                                <label className='col-lg-4 col-12'>Client Name</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <input className="form-control bg-light border-0" id="clientname"  name="clientname" {...formik.getFieldProps("clientname")} placeholder='Enter Name'/>
                                                                                                                                                            
                                                    {/* {(formik.touched.clientname && formik.errors.clientname) ? <small style={{color:"red"}}>{formik.errors.clientname}</small> : null} */}
                                                </div>


                                                <label className='col-lg-4 col-12'>Address</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <textarea className="form-control bg-light border-0" id="clientaddress" rows="3" placeholder="Address" name="clientaddress" {...formik.getFieldProps("clientaddress")} ></textarea>
                                                    <div className="invalid-feedback">
                                                        Please enter a address
                                                    </div>
                                                    {/* {(formik.touched.clientaddress && formik.errors.clientaddress) ? <small style={{color:"red"}}>{formik.errors.clientaddress}</small> : null} */}
                                                </div>


                                                <label className='col-lg-4 col-12'>Email</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <input type="email" className="form-control bg-light border-0" id="clientemail" placeholder="Email Address" name="clientemail"  {...formik.getFieldProps("clientemail")}/>
                                                    <div className="invalid-feedback">
                                                        Please enter a valid email, Ex., example@gamil.com
                                                    </div>
                                                    {(formik.touched.clientemail && formik.errors.clientemail) ? <small style={{color:"red"}}>{formik.errors.clientemail}</small> : null}

                                                </div>


                                                <label className='col-lg-4 col-12'>Contact No</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <input type="text" className="form-control bg-light border-0" data-plugin="cleave-phone" id="clientContactno" placeholder="Contact No." name='clientmobilenumber' {...formik.getFieldProps("clientmobilenumber")} />
                                                    <div className="invalid-feedback">
                                                        Please enter a contact number
                                                    </div>
                                                    {(formik.touched.clientmobilenumber && formik.errors.clientmobilenumber) ? <small style={{color:"red"}}>{formik.errors.clientmobilenumber}</small> : null}
                                                </div>


                                                {servicecategory &&
                                                    <>
                                                        <label className='col-lg-4 col-12'>Service Requirements</label>
                                                        <div className='col-lg-8 col-12 mb-3'>
                                                        <select className="form-control bg-light border-0" name='serviceType' onChange={handleservicetype}>
                                                            <option defaultValue>--- Select Service ---</option>
                                                            {servicecategory.length > 0 && servicecategory.map(list=>
                                                            <option key={list._id} value={list.producttype}>{list.producttype}</option>
                                                            )}

                                                        </select>
                                                        
                                                            {(formik.touched.serviceType && formik.errors.serviceType) ? <small style={{color:"red"}}>{formik.errors.serviceType}</small> : null}
                                                        </div>

                                                        {formik.values.serviceType === "others" &&
                                                            <>
                                                        
                                                                <lable className='col-lg-4 col-12'>Others...</lable>
                                                                <div className='col-lg-8 col-12 mb-3'>
                                                                    <input type="text" className="form-control bg-light border-0"  id="otherservicetype" placeholder="Enter Preferred Requirement" name='otherservicetype' {...formik.getFieldProps("otherservicetype")} />
                                                                    
                                                                    {/* {(formik.touched.otherservicetype && formik.errors.otherservicetype) ? <small style={{color:"red"}}>{formik.errors.otherservicetype}</small> : null} */}
                                                                </div>
                                                            </>                                                                                                          
                                                            
                                                        }

                                                    </>
                                                }


                                                <label className='col-lg-4 col-12'>Details About Requirements</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <textarea className="form-control bg-light border-0" id="requirementdetails" rows="3" placeholder="Enter Requirements" name="requirementdetails" {...formik.getFieldProps("requirementdetails")} ></textarea>
                                                           
                                                    {/* {(formik.touched.requirementdetails && formik.errors.requirementdetails) ? <small style={{color:"red"}}>{formik.errors.requirementdetails}</small> : null} */}
                                                </div>


                                                <label className='col-lg-4 col-12'>Domine Name</label>
                                                <div className='col-lg-2 col-12 mb-3'>
                                                <input type="radio"  name="dominetype" value="existed" onChange={formik.handleChange} />
                                                        <lable >Existed</lable><br />

                                                        <input type="radio"  name="dominetype" value="new" onChange={formik.handleChange} />
                                                        <lable >New</lable><br />                                                                                                         
                                                          
                                                        {/* {(formik.touched.dominetype && formik.errors.dominetype) ? <small style={{color:"red"}}>{formik.errors.dominetype}</small> : null} */}

                                                </div>

                                                {formik.values.dominetype === "existed" &&

                                                    <div className="col-lg-6 col-sm-12">
                                                        <input type='text' className="form-control bg-light border-0"  placeholder="Enter Domine Name" name='existdominename' value={formik.values.existdominename} onChange={handleExistredDomine}/>
                                                    </div>
                                                   }

                                                    {formik.values.dominetype === "new" &&                                                     

                                                        <div className="col-lg-6 col-sm-12">
                                                            <input type='text' className="form-control bg-light border-0"  placeholder="Enter 3 Preferred Domines Seperated By Comma" name='newdominename' value={formik.values.newdominename} onChange={handleNewDomine}/>

                                                            <label htmlFor="exampleFormControlTextarea1" className="form-label text-muted text-uppercase fw-semibold">NOTES</label>
                                                            <textarea className="form-control alert alert-info" id="exampleFormControlTextarea1" placeholder="Notes" rows="1" readOnly>Domine Is A/C To Availability</textarea>
                                                        </div>
                                                                                                             
                                                    }

                                                <div className='row mt-5'>

                                                <label className='col-lg-4 col-12'>Advanced Payment</label>
                                                <div className='col-lg-8 col-12 mb-3'>
                                                <input type="text" className="form-control bg-light border-0"  id="advancedpayment" placeholder="Enter Advanced Payment" name='advancedpayment' {...formik.getFieldProps("advancedpayment")} />
                                                           
                                                    {(formik.touched.advancedpayment && formik.errors.advancedpayment) ? <small style={{color:"red"}}>{formik.errors.advancedpayment}</small> : null}
                                                </div>

                                                </div>
                                                

                                                                                                    
                                             </div>
                                                
                                            </div>
                                            {/*end col*/}
                                            
                                        </div>
                                        {/*end row*/}
                                    </div>
                                    
                                    <div className="card-body p-2">
                                                                                                                                                         
                                        <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                                        {/* <button type="submit" className="btn btn-info"><i className="ri-printer-line align-bottom me-1"></i> Save</button> */}
                                            <button type="submit" className="btn btn-info">Submit</button>
                                            
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        {/*end col*/}
                    </div>
                    {/*end row*/}


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

export default ReuseServiceForm