'use client'


import React from 'react'
import { useState } from 'react'
import { Phone, ArrowRight } from 'lucide-react';
import AuthFooter from './AuthFooter';
const Form = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            onSendCode(phoneNumber);
        } catch (error) {
            console.error('Error sending code:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 md:w-100">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => {
                                const value = e.target.value.replace(/(?!^\+)[^0-9]/g, '');
                                setPhoneNumber(value);
                            }}
                            placeholder="+1 (555) 123-4567"
                            className="text-black block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !phoneNumber}
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 bg-linear-to-r from-[#EB5041] to-[#EF8656]"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        <>
                            Send Verification Code
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </>
                    )}
                </button>
            </form>
            {/* <AuthFooter/> */}
        </>
    )
}

export default Form
