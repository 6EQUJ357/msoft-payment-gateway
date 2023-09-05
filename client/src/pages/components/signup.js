import React , {useState, useEffect}from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"
import {Link, useNavigate} from "react-router-dom"
import axios from "axios"


import API_BASE_URL from "./config.js";


const Signup = () => {
    const navigate = useNavigate();

     //company profile logo & name

     const [company_profile_dataa, set_company_profile_dataa] = useState(null); 

     useEffect(()=>{
        axios.get(`${API_BASE_URL}/getcompanyprofile`).then(res=> 
            {
                set_company_profile_dataa(res.data);
                
            })
     },[])

    const [pass1, setPass1] = useState("password")

    let [eyeoff1, setEye1] = useState("eye-slash")


    const togleHandle1= ()=>{
        if(pass1 ==="password"){
            setPass1("text")
            setEye1("eye-slash")

        }
        else{
            setPass1("password")
            setEye1("eye")

        }
    }


      //selected img URL
   const [imageURL, setImageURL] = useState('');

    
    const formik = useFormik({
        initialValues: {
            userimg : null,
            imageURL: '',
            username:"",
            email : "",
            mobilenumber : null,
            address : null,
            password : "",
            clientIPaddress : ""
             
        },
        validationSchema: Yup.object({
            username : Yup.string().required("FullName Required"),
            email : Yup.string().email("Email Invalid").required("Email Required"),
            password : Yup.string().min(6, "Password Must Be 6 Characters At Least").required("Password Required"),
        }),
        onSubmit: (values, {resetForm}) => {
            //console.log("sfdg", values); 

            const formData = new FormData();
            formData.append("userimg",values.userimg)
            formData.append("username",values.username)
            formData.append("email",values.email)
            formData.append("password",values.password)
            formData.append("clientIPaddress",values.clientIPaddress)


        
            axios.post(`${API_BASE_URL}/muser`, formData).then(res=>
                { 
                    alert(res.data.message)
                    if(res.data.status === 200){
                        navigate("/");
                    }
                }).catch(err=>console.log(err))
            
        }
    })


    // const handleImageChange = (event) => {
    //     const file = event.target.files[0];
    //     formik.setFieldValue('userimg', file);
      
    //     // Create a URL for the selected image

    //     if (file && file.size <= 1024 * 1024) {
    //         formik.setFieldValue('userimg', file);
        
    //         const imageURL = URL.createObjectURL(file);
    //         setImageURL(imageURL);
    //       } else {
    //         formik.setFieldValue('userimg', null);
    //         setImageURL('');
    //       }
    //   };

    const getData = async () => {
        const res = await axios.get(" https://geolocation-db.com/json");    //(or)  https://api.ipify.org/?format=json
        //console.log(res.data);
        formik.setFieldValue("clientIPaddress",res.data.IPv4);
      }; 
    
      useEffect(() => {
        //passing getData method to the lifecycle method
        getData();
      }, []);



  return (
    <div>
        <div className="bg-overlay bg-light"></div>
    
    <div className="account-pages">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-11">
                    <div className="auth-full-page-content d-flex min-vh-100 py-sm-5 py-4">
                        <div className="w-100">
                            <div className="d-flex flex-column h-100 py-0 py-xl-4">

                            <div className="text-center mb-5">
                                {company_profile_dataa && 
                                    <a href="index.html">
                                        <span className="logo-lg">
                                            
                                            <img src={`${API_BASE_URL}/companyprofileimg/${company_profile_dataa[0]?.company_logoo}`}  alt="img not support..." height="35" />&nbsp;
                                            <span style={{fontWeight : "bolder", fontSize:"2rem", color:"black", textTransform:"capitalize"}} >{company_profile_dataa[0]?.company_name}</span>
                                            
                                            
                                        </span>
                                    </a>
                                    }
                                </div>


                                <div className="card my-auto overflow-hidden">
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="p-lg-5 p-4">
                                                    <div className="text-center">
                                                        <h5 className="mb-0">Create Account</h5>
                                                        {/* <p className="text-muted mt-2">Get your free Msoft account now</p> */}
                                                    </div>
                                                
                                                    <div className="mt-4">
                                                        {/* form */}
                                                        <form className="auth-input" onSubmit={formik.handleSubmit} enctype="multipart/form-data">
                                                                                    
                                                            <div className="mb-3">
                                                                <label htmlFor="name" className="form-label">Full Name</label>
                                                                <input type="text" className="form-control" id="name" placeholder="Enter FullName" name='username' {...formik.getFieldProps("username")} />
                                                                {(formik.touched.username && formik.errors.username) ? <small style={{color:"red"}}>{formik.errors.username}</small> : null} 
                                                            </div>

                                                            <div className="mb-3">
                                                                <label htmlFor="email" className="form-label">Email</label>
                                                                <input type="text" className="form-control" id="email" placeholder="Enter email" name='email' {...formik.getFieldProps("email")} />
                                                                {(formik.touched.email && formik.errors.email) ? <small style={{color:"red"}}>{formik.errors.email}</small> : null}
                                                            </div>
                                    
                                                            <div className="mb-2">
                                                                <label htmlFor="userpassword" className="form-label">Password</label> 
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type={pass1} className="form-control pe-5 password-input" placeholder="Enter password" id="userpassword" name='password' {...formik.getFieldProps("password")} />
                                                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={()=>togleHandle1()}><i className={`las la-${eyeoff1} align-middle fs-18`}></i></button>
                                                               </div>
                                                               {(formik.touched.password && formik.errors.password) ? <small style={{color:"red"}}>{formik.errors.password}</small> : null}
                                                            </div>

                                                            {/* <div className="mb-2">
                                                                
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <input type="file" className="form-control pe-5 password-input"  name='userimg' onChange={handleImageChange} />
                                                                    
                                                               </div>
                                                               {(formik.touched.userimg && formik.errors.userimg) ? <small style={{color:"red"}}>{formik.errors.userimg}</small> : null}
                                                            </div> */}
                                                            

         
                
                                                            {/* <div className="fs-16 pb-2">
                                                                <p className="mb-0 fs-14 text-muted fst-italic">By registering you agree to the Invoika <a href="#a" className="text-primary text-decoration-underline fst-normal fw-medium">Terms of Use</a></p>
                                                            </div> */}
        
                                                            <div className="mt-2">
                                                                <button className="btn btn-primary w-100" type="submit">Sign Up</button>
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                <p className="mb-0">Already an account ? <Link to="/" className="fw-medium text-primary text-decoration-underline"> Signin </Link> </p>
                                                            </div>
                                                        </form>
                                                    </div>
                                
                                                </div>
                                            </div>
                
                                            <div className="col-lg-6">
                                                <div className="d-flex h-100 bg-auth align-items-end" > 
                                                {/* style={{backgroundImage :(imageURL && !formik.errors.userimg) ? `url(${imageURL})`:`url('assets/images/bg-auth.jpg')`}} */}
                                                    <div className="p-lg-5 p-4">
                                                        <div className="bg-overlay bg-primary"></div>
                                                        <div className="p-0 p-sm-4 px-xl-0 py-5">
                                                            <div id="reviewcarouselIndicators" className="carousel slide auth-carousel" data-bs-ride="carousel">
                                                                <div className="carousel-indicators carousel-indicators-rounded">
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                                    <button type="button" data-bs-target="#reviewcarouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                                </div>
                                                            
                                                                
                                                                {/* end carousel-inner */}
                                                            </div>
                                                            {/* end review carousel */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                    </div>
                                </div>
                                {/* end card */}
                                
                                <div className="mt-5 text-center">
                                    <p className="mb-0 text-muted">©
                                        <script>document.write(new Date().getFullYear())</script> Invoika. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end col */}
            </div>
            {/* end row */}
        </div>
        {/* end container */}
    </div>
    </div>
  )
}

export default Signup