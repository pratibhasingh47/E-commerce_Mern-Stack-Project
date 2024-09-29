import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { signup } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import loginpng from '../../assets/login.png';
import '../css/Signup-Login.css';
import { FcGoogle } from "react-icons/fc";


const Signup = () => {
    const validationSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required").email("Invalid Email"),
        password: z.string()
            .min(8, "Password must be of at least 8 letters")
            .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
            .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
            .regex(/[0-9]/, "Password must contain at least 1 Number")
            .regex(/[\W_]/, "Password must contain at least 1 special character"),
        phoneNumber: z.string().min(10, "Phone number must contain 10 numbers").max(10, "Phone number must contain 10 numbers")
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    });

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate

    const onSubmit = async (data) => {
        const result = await dispatch(signup(data));
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/login'); // Navigate to home route on successful sign-up
        }
    }

    const handleGoogleLogin = ()=>{
        window.location.href = "http://localhost:5000/api/auth/google";
    }

    const handleLoginNavigation = () => {
        navigate('/login'); // Navigate to login route when 'Login Here' is clicked
    };

    return (
        <div className='mainContainer'>

        <div className="right-leftCon">


        <div className="right">
            {/* <img  src="https://images.pexels.com/photos/1408221/pexels-photo-1408221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" /> */}
            <img  src="https://images.pexels.com/photos/18425556/pexels-photo-18425556/free-photo-of-white-peony-flowers-on-a-branch.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            <p className='right_heading'>Welcome to Prat's Shop !!!</p>
            <p className='right_content'>Get access to your Orders, Wishlist and Recommendations</p>
            {/* <img className='right_img' src="https://static.vecteezy.com/system/resources/thumbnails/012/443/036/small/woman-sitting-table-with-laptop-and-phone-working-on-a-computer-freelance-online-education-or-social-media-concept-studying-concept-png.png" alt="" /> */}
        </div>

        <div className="left">

        <div className="midCon">
                <div className='firstCont'>
                    <img src={loginpng} alt="login" className='imgLogin' />
                    <p className='signup_heading'>Sign-Up</p>
                    <p className='signup_content'>Create a free account with your email !</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='signup_form'>
                    <div className="excludeSubmit">
                        <div className='input_field'>
                            <label htmlFor="" className='signup_label'>Name</label>
                            <input type="text" className={`signup_input ${errors.name ? "border-red-500 outline-none" : "outline-none"}`} {...register("name")} />
                            {errors.name && (
                                <p className='error'>{errors.name.message}*</p>
                            )}
                        </div>

                        <div className='input_field'>
                            <label htmlFor="" className='signup_label'>Email</label>
                            <input type="email" className={`signup_input ${errors.email ? "border-red-500 outline-none" : "outline-none"}`} {...register("email")} />
                            {errors.email && (
                                <p className='error'>{errors.email.message}*</p>
                            )}
                        </div>

                        <div className='input_field'>
                            <label htmlFor="" className='signup_label'>Password</label>
                            <input type="password" className={`signup_input ${errors.password ? "border-red-500 outline-none" : "outline-none"}`} {...register("password")} />
                            {errors.password && (
                                <p className='error'>{errors.password.message}*</p>
                            )}
                        </div>

                        <div className='input_field'>
                            <label htmlFor="" className='signup_label'>Phone Number</label>
                            <input type="number" className={`signup_input ${errors.phoneNumber ? "border-red-500 outline-none" : "outline-none"}`} {...register("phoneNumber")} />
                            {errors.phoneNumber && (
                                <p className='error'>{errors.phoneNumber.message}*</p>
                            )}
                        </div>
                    </div>
                    <button className='signup_button'>Sign-Up</button>
                </form>
                <p className='already_account'>
                    Have an account? 
                    <span className='login_here' onClick={handleLoginNavigation} >Login Here!</span>
                </p>
                <button className='google_login' onClick={handleGoogleLogin}> <FcGoogle className='googlePic' /> Log-In- With Google</button>
            </div>

        </div>

    </div>
            
    </div>

    )
}

export default Signup;



// import { zodResolver } from '@hookform/resolvers/zod';
// import React from 'react'
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { z } from 'zod';
// import { signup } from '../../redux/slices/authSlice';
// import loginpng from '../../assets/login.png';
// import '../css/Signup-Login.css';

// const Signup = () => {
//     const validationSchema = z.object({
//         "name" : z.string().min(1,"Name is required"),
//         "email" : z.string().min(1,"Email is required").email("Invalid Email"),
//         "password" : z.string()
//                 .min(8,"Password must be of at least 8 letters")
//                 .regex(/[a-z]/,"Password must contain atleast 1 lowercase letter")
//                 .regex(/[A-Z]/,"Password must contain atleast 1 uppercase letter")
//                 .regex(/[0-9]/,"Password must contain atleast 1 Number")
//                 .regex(/[\W_]/,"Password must contain atlest 1 special charater"),
//         "phoneNumber" : z.string().min(10,"Phone number must contain 10 numbers").max(10,"Phone number must contain 10 numbers")
//     })
//     const { register , handleSubmit , formState : {errors} } = useForm({
//         resolver : zodResolver(validationSchema)
//     });

    
//     const dispatch = useDispatch();


//     const onSubmit = async (data)=>{
//         dispatch(signup(data));
//     }

//     return (

//         <div className='mainContainer' >
//             <div className="midCon">

//                 <div className='firstCont'>
//                     <img src={loginpng} alt="login" className='imgLogin' />
//                     <p className='signup_heading'>Sign-Up</p>
//                     <p className='signup_content'>Create a free account with your email !</p>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)} className='signup_form'>

//                     <div className="excludeSubmit">


//                         <div className='input_field'>
//                             <label htmlFor="" className='signup_label'>Name</label>
//                             {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
//                             <input type="text" className={`signup_input  ${errors.name ? "border-red-500 outline-none" : " outline-none"}`} {...register("name")} />
//                             {errors.name && (
//                                 <p className='error'>{errors.name.message}*</p>
//                             )}
//                         </div>

//                         <div className='input_field'>
//                             <label htmlFor="" className='signup_label'>Email</label>
//                             {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
//                             <input type="email" className={`signup_input ${errors.email ? "border-red-500 outline-none" : "outline-none"}`} {...register("email")} />
//                             {errors.email && (
//                                 <p className='error'>{errors.email.message}*</p>
//                             )}
//                         </div>

//                         <div className='input_field'>
//                             <label htmlFor="" className='signup_label'>Password</label>
//                             {/* <input type="text " className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
//                             <input type="password" className={`signup_input  ${errors.password ? "border-red-500 outline-none" : "outline-none"}`} {...register("password")} />
//                             {errors.password && (
//                                 <p className='error'>{errors.password.message}*</p>
//                             )}
//                         </div>

//                         <div className='input_field'>
//                             <label htmlFor="" className='signup_label'>Phone Number</label>
//                             {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
//                             <input type="number" className={`signup_input  ${errors.phoneNumber ? "border-red-500 outline-none" : " outline-none"}`}   {...register("phoneNumber")} />
//                             {errors.phoneNumber && (
//                                 <p className='error'>{errors.phoneNumber.message}*</p>
//                             )}
//                         </div>

//                     </div>
//                     <button className='signup_button'>Sign-Up</button>

//                 </form>
//                 <p className='already_account'>Have an account? <a className='login_here' href="">Login Here!</a></p>
//             </div>
//         </div>


//     )
// }

// export default Signup