import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation, Navigate } from 'react-router-dom'
import "../../App.css"
import axios from 'axios' 
import API_BASE_URL from './config'

const Successpayment = () => {

    const location = useLocation();
 
    let paymentData = location.state;
    //console.log("first", paymentData);


    
  useEffect(()=>{ 
    axios.get(`${API_BASE_URL}/successpayment`, {
        headers :{
            "x-token" : localStorage.getItem("token")
        }
    }).catch(err => console.log(err))  
},[]) 

// if(!token){
//     return <Navigate to="/" />
// }

if(!localStorage.getItem("token")){
     return <Navigate to="/" />
}



  return (

    <div className='d-flex justify-content-center align-items-center'>
    
        <div className="card" style={{width: "23rem", height:"40vw"}}>

           

            <div className="card-body payment-head">
                <h5 className="card-title payment-title">Paid Successfully</h5>
                <p className="card-text fs-3 "><i className="las la-rupee-sign"></i>{paymentData && paymentData.advancedpayment} <i className="las la-check-circle"></i></p>
                <p className="card-text">Thank You For Using Our Services...</p>
            </div> 

           

            <div className="d-flex bd-highlight mb-3">
                <div className="me-auto p-2 bd-highlight">Service Id</div>
                <div className="p-2 bd-highlight">{paymentData && paymentData.service_id}</div>
            </div>

            <div className="d-flex bd-highlight mb-3">
                <div className="me-auto p-2 bd-highlight">Payment Id</div>
                <div className="p-2 bd-highlight">{paymentData && paymentData.payment_id}</div>
            </div>

            {/* <div className="d-flex bd-highlight mb-3">
                <div className="me-auto p-2 bd-highlight">Amount</div>
                <div className="p-2 bd-highlight">{paymentData && paymentData.advancedpayment}</div>
            </div> */}

            <div className="d-flex bd-highlight mb-3">
                <div className="me-auto p-2 bd-highlight">Date Of Payment</div>
                <div className="p-2 bd-highlight">{paymentData && new Date(paymentData.date).toLocaleString()}</div>
            </div>
               
           

            <div className="card-body">
                <Link to="/dashboard" className="btn btn-success">Dashboard</Link>
                {/* <a href="#" className="card-link">Another link</a> */}
            </div>
        </div>
    </div>
  )
}

export default Successpayment