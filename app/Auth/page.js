import Image from 'next/image'
import React from 'react'
import { Phone } from 'lucide-react';
import Form from './Form';
import AuthFooter from './AuthFooter';
import AuthHeader from './AuthHeader';

const page = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 min-h-screen'>
            {/* Left Section */}
            <div className="flex flex-col items-center justify-center bg-[url('/grp1.svg')] bg-no-repeat bg-cover bg-center px-4 py-8 md:min-h-screen md:px-0">
                <Image
                    src="/logo.svg"
                    alt="Picture of the logo"
                    className="pt-5 w-24 sm:w-32 md:w-48 lg:w-56"
                    width={0}
                    height={0}
                />

                <h1 className="mt-6 text-[#080808] text-xl sm:text-2xl md:text-5xl font-bold leading-snug text-center">
                    Welcome to Dodawork
                </h1>
            </div>

            {/* Right Section */}
            <div className='flex items-center justify-center p-6 md:p-8 bg-white'>
                <div className='w-full max-w-md'>
                    <AuthHeader />
                    <Form />
                    <AuthFooter />
                </div>
            </div>
        </div>

    )
}

export default page
