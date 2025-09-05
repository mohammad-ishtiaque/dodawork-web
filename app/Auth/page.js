import Image from 'next/image'
import React from 'react'
import { Phone } from 'lucide-react';

const page = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 h-full min-h-[100vh]'>
            <div className="md:h-full md:min-h-[100vh] bg-[url('/grp1.svg')] bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center">
                <Image
                    src="/logo.svg"
                    alt="Picture of the logo"
                    className="pt-5 w-30 md:w-50"
                    width={0}
                    height={0}
                />

                {/* Welcome Text */}
                <h1 className="mt-6 text-[#080808] text-2xl md:text-5xl not-italic font-bold leading-normal text-center">
                    Welcome to Dodawork
                </h1>
            </div>
            <div>02</div>
        </div>
    )
}

export default page
