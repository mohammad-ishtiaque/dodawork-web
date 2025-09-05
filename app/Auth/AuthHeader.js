import { Phone } from 'lucide-react'
import React from 'react'

const AuthHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-b from-[#EB5041] to-[#EF8656]" >
        <Phone className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Quick Request</h2>
      <p className="text-gray-600">
        {/* {step === 'phone'  */}
          Using your phone number
          {/* : 'Enter the verification code sent to your phone' */}
        {/* } */}
      </p>
    </div>
  )
}

export default AuthHeader
