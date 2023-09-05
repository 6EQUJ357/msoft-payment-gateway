import React from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"

import API_BASE_URL from "./config.js";


const Sidebar = (params) => {
  return (
    <div  className='slidebarm' >

         {/* LOGO */}
         {params.value3 &&
            <div className="navbar-brand-box">
               {/* Dark Logo*/}
                <Link to="/" className="logo logo-dark">
                    <span className="logo-sm">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img'/>
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                    <span className="logo-lg">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img' />
                        <span className='c_profile_name c_profile_sidebar_name'>{params.value3[0]?.company_name}</span>
                    </span>
                </Link>
               {/* Light Logo*/}
                <a href="#" className="logo logo-light">
                    <span className="logo-sm">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img' />
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                    <span className="logo-lg">
                        <img src={`${API_BASE_URL}/companyprofileimg/${params.value3[0]?.company_logo}`} alt="no img" className='c_profile_img' />
                        <span className='c_profile_name c_profile_sidebar_name' >{params.value3[0]?.company_name}</span>
                    </span>
                </a>
                <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>
        }
        <div id="scrollbar" >
                <div className="container-fluid scrollBar_Style" >

                    <div id="two-column-menu">
                    </div>

                   
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/dashboard">
                                <i className="las la-house-damage align-middle me-2"></i> <span data-key="t-dashboard">Dashboard</span>
                            </Link>
                        </li>


                        <li className="nav-item">
                            
                                <ul className="nav  flex-column">  {/* nav-sm */}

                                    <li className="nav-item">
                                        <Link to="/serviceform" className="nav-link" data-key="t-invoice"><i className="las la-file-invoice align-middle me-2"></i>Service Application Form</Link>
                                    </li>

                                    
                                    <li className="nav-item">
                                        <Link to="/saveddraftserviceform" className="nav-link" data-key="t-add-invoice"><i className="ri-draft-line align-middle me-2"></i>Saved Drafts</Link>
                                    </li>  


                                    <li className="nav-item">
                                        <Link to="/savedsubmitserviceform" className="nav-link" data-key="t-invoice"><i className="las la-file-invoice align-middle me-2"></i>Submit Applications</Link>
                                    </li>   

                                    {/* {params.value1.userType !== "user" && 
                                    <li className="nav-item">
                                        <Link to="" className="nav-link" data-key="t-add-invoice"><i className="ri-arrow-left-down-fill align-middle me-2"></i> Previous Applications </Link>
                                    </li>
                                    } */}

                                   
                                    <li className="nav-item">
                                        <Link to="/paymentdetails" className="nav-link" data-key="t-users"><i class="las la-money-bill-wave-alt  align-middle me-2"></i>Payment Details</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/orderdetails" className="nav-link" data-key="t-users"><i className="ri-file-list-3-line align-middle me-2"></i>Order Details</Link>
                                    </li>

                                   

                                    {params.value1.userType !== "user" && 
                                    <>

                                    <li className="nav-item">
                                        <Link to="/categories" className="nav-link" data-key="t-users"><i className="las la-stream align-middle me-2"></i> Service Categories</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/users" className="nav-link" data-key="t-users"><i className="las la-user-friends align-middle me-2"></i>Users</Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/companyprofiledata" className="nav-link" data-key="t-users"><i className="las la-address-card"></i> Company Profile</Link>
                                    </li>
                                    </>
                                    }

                                   

                             
                                    
                                </ul>
                            {/* </div> */}
                        </li>


                    </ul>
                   
                    
                </div>
               {/* Sidebar */}
            </div>

            <div className="sidebar-background"></div>

    </div>
  )
}

export default Sidebar