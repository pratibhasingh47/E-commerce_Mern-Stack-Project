import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import { login } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';;
import loginpng from '../../assets/login.png';
import '../css/Signup-Login.css';
import { FcGoogle } from "react-icons/fc";
import shop from '../../assets/Shop.jpg';


const Login = () => {
    const validationSchema = z.object({
        "email": z.string().min(1, "Email is required"),
        "password": z.string().min(1, "Password is required"),

    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    });

    const { isAuth } = useSelector((state) => state.auth);


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = (data) => {
        dispatch(login(data));

    };

    const handleSignupNavigation = () => {
        navigate('/signup'); // Navigate to login route when 'Login Here' is clicked
    };

    const handleGoogleLogin = ()=>{
        window.location.href = "http://localhost:5000/api/auth/google";
    }

    const handleHomePage = ()=>{
        navigate('/');
    }


    useEffect(() => {
        if (isAuth) {
            navigate("/");
        }
    }, [isAuth]);


    return (

        <div className='mainContainer' >

            <div className="right-leftCon">

                <div className="right">
                    <img src={shop} alt="" />
                    <p className='right_heading'>Welcome to Prat's Shop !!!</p>
                    <p className='right_content'>Get access to your Orders, Wishlist and Recommendations</p>
                </div>

                <div className="left">

                    <div className="midCon">

                        <div className='firstCont'>
                            <img src={loginpng} alt="login" className='imgLogin' />
                            <p className='signup_heading'>Log-In</p>
                            <p className='signup_content'>Log-in to your account with email !</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='signup_form'>

                            <div className="excludeSubmit">



                                <div className='input_field'>
                                    <label htmlFor="" className='signup_label'>Email</label>
                                    {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
                                    <input type="text" className={`signup_input ${errors.email ? "border-red-500 outline-none" : "outline-none"}`} {...register("email")} />
                                    {errors.email && (
                                        <p className='error'>{errors.email.message}*</p>
                                    )}
                                </div>

                                <div className='input_field'>
                                    <label htmlFor="" className='signup_label'>Password</label>
                                    {/* <input type="text " className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
                                    <input type="password" className={`signup_input  ${errors.password ? "border-red-500 outline-none" : "outline-none"}`} {...register("password")} />
                                    {errors.password && (
                                        <p className='error'>{errors.password.message}*</p>
                                    )}
                                </div>


                            </div>
                            <button className='signup_button'>Log-In</button>

                        </form>
                        <p className='already_account'>
                            Have an account?
                            <span className='login_here' onClick={handleSignupNavigation} >Sign-Up Here!</span>
                        </p>
                        <button className='google_login' onClick={handleGoogleLogin}> <FcGoogle className='googlePic' /> Log-In- With Google</button>
                        <p className='my-8 cursor-pointer' onClick={handleHomePage} >Back to HomePage</p>
                    </div>

                </div>

            </div>


        </div>


    )
}

export default Login