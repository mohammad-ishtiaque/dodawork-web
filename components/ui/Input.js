import React from 'react';

const Input = ({ label, type = "text", placeholder, value, onChange, icon: Icon, name, className = "" }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 text-gray-700"
                />
                {Icon && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                        <Icon size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;
