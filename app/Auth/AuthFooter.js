import React from 'react'
import { Shield, Check } from 'lucide-react';

const AuthFooter = () => {
    return (
        <>
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    By continuing, you agree to our{' '}
                    <a href="#" className="font-medium hover:underline" style={{ color: '#EB5041' }}>
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium hover:underline" style={{ color: '#EB5041' }}>
                        Privacy Policy
                    </a>
                </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-xs text-gray-400">
                <div className="flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    SSL Secured
                </div>
                <div className="flex items-center">
                    <Check className="w-4 h-4 mr-1" />
                    GDPR Compliant
                </div>
            </div>
        </>

    )
}

export default AuthFooter
