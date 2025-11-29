import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "", disabled = false }) => {
    const baseStyles = "w-full py-4 rounded-full font-bold text-lg transition-all duration-200 active:scale-[0.98]";

    const variants = {
        primary: "bg-[#F57C00] text-white hover:bg-[#E65100] shadow-lg shadow-orange-200",
        outline: "border-2 border-[#F57C00] text-[#F57C00] hover:bg-orange-50",
        ghost: "text-[#F57C00] hover:bg-orange-50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
