import React, {useState, createContext, useEffect} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import API_BASE_URL from './pages/components/config'
import axios from 'axios'

//pages import
import Company_profile from './pages/components/company_profile'

import Signin from './pages/components/signin'
import Signup from './pages/components/signup'
import Dashboard from './pages/components/dashboard'

import ServiceForm from "./pages/components/serviceForm"
import SavedDraftServiceForm from './pages/components/savedDraftServiceForm'
import ServiceFormDetails from "./pages/components/serviceFormDetails"

import SavedSubmitServiceForm from './pages/components/savedSubmitServiceForm'
import ViewDetails from './pages/components/viewDetails'

import PasswordReset from './pages/components/passwordReset'


//categories
import Categories from './pages/components/categories'

import Users from './pages/components/users'
import ViewUser from './pages/components/viewUser'
import EditUser from './pages/components/editUser'



import CompanyProfileData from './pages/components/company_profile_data'
import Viewcompanyprofile from './pages/components/viewCompanyProfile'
import EditCompanyProfileData from './pages/components/editCompanyProfileData'


import PaymentDetails from './pages/components/paymentDetails'
import ViewPaymentDetails from './pages/components/viewPaymentDetails'


import OrderDetails from './pages/components/orderDetails'

import Successpayment from './pages/components/successPayment'


export const store = createContext();
export const company_profile_store = createContext();

const App = () => {
  //const [token, setToken] = useState(null);

  //company profile logo & name
  const [company_profile_dataa, set_company_profile_dataa] = useState(null);

   //getting company profilre data

   useEffect(()=>{
    axios.get(`${API_BASE_URL}/getcompanyprofile`).then(res=> 
        {
            set_company_profile_dataa(res.data);
            //console.log("qwertysdfgh", res.data)
            
        })
},[])

  return (
    <div>
      {/* <store.Provider value={[token,setToken]}> */}

        <company_profile_store.Provider value={[company_profile_dataa, set_company_profile_dataa]}>

          <BrowserRouter>

            <Routes>

              {/* login page */}
              <Route path='/companyprofile'  element={<Company_profile />}/>
              <Route path='/' element = {<Signin/>} />
              <Route path='/signup' element = {<Signup/>} />
              <Route path='/dashboard' element = {<Dashboard/>} />

           
              <Route path='/saveddraftserviceform' element = {<SavedDraftServiceForm />}/>
              <Route path='/serviceform' element = {<ServiceForm />}/>
              <Route path='/serviceformdetails' element = {<ServiceFormDetails />}/>

              <Route path='/savedsubmitserviceform' element = {<SavedSubmitServiceForm />}/>  
              <Route path='/viewdetails' element = {<ViewDetails />}/>

         

              <Route path='/resetpassword' element = {<PasswordReset />} />

              <Route path='/paymentdetails' element = {<PaymentDetails />}/>
              <Route path="/viewpaymentdetails" element={<ViewPaymentDetails />}/>

              <Route path='/orderdetails' element = {<OrderDetails />}/>

              <Route path="/successpayment" element = {<Successpayment />}/>




              <Route path='/categories' element = {<Categories />}/>

              <Route path='/users' element = {<Users />} />
              <Route path='/viewuser' element = {<ViewUser />} />
              <Route path='/edituser' element = {<EditUser />} />


 


              <Route path='/companyprofiledata' element = {<CompanyProfileData />}/>
              <Route path='/viewcompanyprofiledata' element ={<Viewcompanyprofile />}/> 
              <Route path='/editcompanyprofiledata' element ={<EditCompanyProfileData />}/>

            

            </Routes>
          </BrowserRouter>

        {/* </store.Provider> */}
      </company_profile_store.Provider>

      {/* </store.Provider> */}
    </div>
  )
}

export default App