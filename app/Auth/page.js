import Image from 'next/image'
import React from 'react'
import { Phone } from 'lucide-react';

const page = () => {
    return (
        <div className="flex flex-row h-[100vh]">
            <div className="flex flex-col items-center justify-center basis-1/2 bg-gradient-to-b from-[#EB5041] to-[#EF8656]">
                <div className="absolute w-50 h-50 bg-[url('/pattern.svg')] bg-no-repeat bg-center bg-contain top-50 left-140"></div>
                {/* Circle */}
                <div className="w-[200px] h-[200px] rounded-full bg-gradient-to-b from-[#E95932] to-[#F6B3A1] flex flex-col items-center pt-4">
                    <h3 className="text-white text-center text-2xl not-italic font-bold leading-[106%] pt-5">
                        dodawork
                    </h3>
                    <Image
                        src="/logo.svg"
                        alt="Picture of the logo"
                        className="pt-5"
                        width={70}
                        height={70}
                    />
                </div>

                {/* Welcome Text */}
                <h1 className="mt-6 text-[#080808] text-5xl not-italic font-bold leading-normal text-center">
                    Welcome to Dodawork
                </h1>
                <div className="absolute bottom-0 left-0 w-60 h-16 bg-linear-to-r from-[#F25F4B] to-[#7BABF4] rounded-full rotate-145 overflow-hidden"></div>
                <div className="absolute bottom-70 left-130 w-60 h-16 bg-white/20 rounded-full rotate-145"></div>
                <div className="absolute bottom-[-50] left-0 w-60 h-16 bg-white/20 rounded-full rotate-145"></div>
            </div>

            <div className="basis-1/2 bg-white">
                {/* <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ backgroundColor: '#EF8656' }}>
                        <Phone className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                    <p className="text-gray-600">
                        
                            Enter your phone number to get started
                        
                    </p>
                </div> */}
            </div>
        </div>
    )
}

export default page
