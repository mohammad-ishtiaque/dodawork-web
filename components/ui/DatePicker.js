"use client";
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DatePicker = ({ label, value, onChange, placeholder, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const containerRef = useRef(null);

    // Initialize selectedDate from value prop
    useEffect(() => {
        if (value) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                setSelectedDate(date);
                setCurrentDate(date);
            }
        }
    }, [value]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // Adjust for Monday start if needed, currently Sunday start (0)
        // Design shows Mo Tu We Th Fr Sa Su
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        return { daysInMonth, firstDay: adjustedFirstDay };
    };

    const { daysInMonth, firstDay } = getDaysInMonth(currentDate);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
    };

    const handleSetDate = () => {
        if (selectedDate) {
            // Format as YYYY-MM-DD for standard input compatibility
            const formatted = selectedDate.toISOString().split('T')[0];
            onChange({ target: { name, value: formatted } });
            setIsOpen(false);
        }
    };

    const formatDateDisplay = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "";
        // Format: MM/DD/YYYY
        return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <div className="flex flex-col gap-2 relative" ref={containerRef}>
            {label && <label className="text-sm font-medium text-gray-600">{label}</label>}

            <div
                className="relative cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <input
                    type="text"
                    readOnly
                    value={formatDateDisplay(value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white cursor-pointer"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                    <Calendar size={20} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ChevronLeft size={20} className="text-gray-600" />
                        </button>
                        <span className="font-bold text-gray-800">
                            {months[currentDate.getMonth()]}
                        </span>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded-lg">
                            <ChevronRight size={20} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-4 text-center">
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                            <div key={day} className="text-xs font-medium text-gray-400 py-1">
                                {day}
                            </div>
                        ))}

                        {/* Empty cells */}
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}

                        {/* Days */}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isSelected = selectedDate &&
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() === currentDate.getMonth() &&
                                selectedDate.getFullYear() === currentDate.getFullYear();

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={`
                    w-8 h-8 rounded-full text-sm flex items-center justify-center transition-colors mx-auto
                    ${isSelected
                                            ? 'bg-[#F57C00] text-white font-medium shadow-md'
                                            : 'text-gray-700 hover:bg-orange-50'
                                        }
                  `}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="px-3 py-2 border border-orange-200 rounded-lg text-sm text-gray-600">
                            {selectedDate ? formatDateDisplay(selectedDate.toISOString()) : 'Select Date'}
                        </div>
                        <button
                            onClick={handleSetDate}
                            className="px-6 py-2 bg-[#F57C00] text-white text-sm font-medium rounded-lg hover:bg-[#E65100] transition-colors"
                        >
                            Set Date
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
