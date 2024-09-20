import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Signup = () => {

    const validationSchema = z.object({
        "name": z.string().min(1, "Name is required"),
        "email": z.string().min(1, "Email is required").email("Invalid Email"),
        "password": z.string()
            .min(8, "Password must be of at least 8 letters")
            .regex(/[a-z]/, "Password must contain atleast 1 lowercase letter")
            .regex(/[A-Z]/, "Password must contain atleast 1 uppercase letter")
            .regex(/[0-9]/, "Password must contain atleast 1 Number")
            .regex(/[\W_]/, "Password must contain atlest 1 special charater"),
        "phoneNumber": z.string().min(10, "Phone number must contain 10 numbers").max(10, "Phone number must contain 10 numbers")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(validationSchema)
    })

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        // <div>Signup</div>

        <div className='w-3/12 h-auto bg-violet-300 py-9 rounded flex flex-col justify-center items-center' >
            <div>
                <p className='text-4xl font-extrabold text-center pb-3'>Sign-Up</p>
                <p className='text-2xl font-lato pb-3 mb-3 text-center'>Create a free account with your email !</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center w-3/4'>
                <div className='flex-col'>
                    <label htmlFor="" className='text-lg font-lato font-light '>Name</label>
                    {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
                    <input type="text" className={`p-2 w-[100%] mt-0 rounded outline-none  ${errors.name ? "border-red-500 outline-none" : " outline-none"}`} {...register("name")} />
                    {errors.name && (
                        <p className='text-xs text-red-500'>{errors.name.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="" className='text-lg pr-4 font-lato font-light'>Email</label>
                    {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
                    <input type="text" className={`p-2 w-[100%] mt-0 rounded outline-none ${errors.email ? "border-red-500 outline-none" : "outline-none"}`} {...register("email")} />
                    {errors.email && (
                        <p className='text-xs text-red-500'>{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="" className='text-lg font-lato font-light'>Password</label>
                    {/* <input type="text " className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
                    <input type="text " className={`p-2 w-[100%] mt-0 rounded outline-none  ${errors.password ? "border-red-500 outline-none" : "outline-none"}`} {...register("password")} />
                    {errors.password && (
                        <p className='text-xs text-red-500'>{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="" className='text-lg font-lato font-light'>Phone Number</label>
                    {/* <input type="text" className='p-2 w-[100%] mt-0 rounded mb-3 outline-none ' /> */}
                    <input type="text" className={`p-2 w-[100%] mt-0 rounded outline-none  ${errors.phoneNumber ? "border-red-500 outline-none" : " outline-none"}`}   {...register("phoneNumber")} />
                    {errors.phoneNumber && (
                        <p className='text-xs text-red-500'>{errors.phoneNumber.message}</p>
                    )}
                </div>
                <button className='py-2 px-5 w-[40%] bg-violet-950 rounded font-lato font-bold text-xl mt-5 hover:bg-black text-white'>Sign-Up</button>
            </form>
            <p className='mt-5 font-lato text-left w-[75%] text-sm'>Have an account? <a className='underline decoration-solid' href="">Login Here!</a></p>
        </div>


    )
}

export default Signup