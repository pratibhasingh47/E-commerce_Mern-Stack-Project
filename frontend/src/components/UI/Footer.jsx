import React from 'react'

const Footer = () => {



    return (
        <div className='bg-gray-900 flex justify-center items-center flex-col h-auto w-full  '>

            <div className='flex w-[90%] pt-12 pb-6 justify-evenly '>

                <div className='p-4  w-[20%] flex flex-col '>
                    <p className='text-white font-lato font-bold text-2xl'>About</p>
                    <div className='w-[80%] my-4 flex flex-col'>
                        <a href="" className='font-lato text-white text-sm'>Contact Us</a>
                        <a href="" className='font-lato text-white text-sm' >About Us</a>
                        <a href="" className='font-lato text-white text-sm' >Experiences</a>
                        <a href="" className='font-lato text-white  text-sm' >Corporate Imformation</a>
                    </div>
                </div>

                <div className='p-4 flex w-[20%] flex-col '>
                    <p className='text-white font-lato  font-bold text-2xl'>Help</p>
                    <div className='w-[80%] my-4 flex flex-col'>
                        <a href="" className='font-lato text-white text-sm'>Payments</a>
                        <a href="" className='font-lato text-white text-sm' >Shipping</a>
                        <a href="" className='font-lato text-white text-sm' >Cancellations & Returns</a>
                        <a href="" className='font- text-white text-sm' >FAQ</a>
                    </div>
                </div>

                <div className='p-4 flex w-[20%] flex-col '>
                    <p className='text-white font-lato  font-bold text-2xl'>Consumer Policy</p>
                    <div className='w-[80%] my-4 flex flex-col'>
                        <a href="" className='font-lato text-white text-sm'>Terms Of Use</a>
                        <a href="" className='font-lato text-white text-sm' >Security</a>
                        <a href="" className='font-lato text-white text-sm' >Privacy</a>
                        <a href="" className='font-lato text-white text-sm' >Sitemap</a>
                    </div>
                </div>

                <div className='p-4 flex w-1/4 flex-col '>
                    <p className='text-white font-lato  font-bold text-2xl'>Registered Office Address :- </p>
                    <div className='w-[80%] my-4 flex flex-col'>
                        <a href="" className='font-lato text-white text-sm'>Prats shoppie Private Limited,</a>
                        <a href="" className='font-lato text-white text-sm' >Clove Embassy Tech Village</a>
                        <a href="" className='font-lato text-white text-sm' >Bengaluru, 560103,</a>
                        <a href="" className='font-lato text-white text-sm' >Karnataka, India</a>
                        <a href="" className='font-lato text-white text-sm' >CIN : U51109KA201200000000</a>
                        <a href="" className='font-lato text-white text-sm' >Telephone: 044-4561XXXX / 044-6741XXXX</a>
                    </div>
                </div>


            </div>


            <div className='h-14 items-center text-white border-t-2 border-indigo-100 justify-center flex w-full text-center' > <p>© All Rights Reserved ! Made with ❤️ by Pratibha Singh</p> </div>


        </div>
    )
}

export default Footer