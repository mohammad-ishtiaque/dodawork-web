import React from 'react';
import { ChevronDown } from 'lucide-react';

const Select = ({ label, options = [], value, onChange, placeholder, name, className = "" }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && <label className="text-sm font-medium text-gray-600">{label}</label>}
            <div className="relative">
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white text-gray-700 cursor-pointer"
                >
                    <option value="" disabled>
                        {placeholder || "Select an option"}
                    </option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                    <ChevronDown size={20} />
                </div>
            </div>
        </div>
    );
};

export default Select;
