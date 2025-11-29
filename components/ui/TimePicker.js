"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

const TimePicker = ({ label, value, onChange, placeholder, name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedHour, setSelectedHour] = useState('12');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [selectedPeriod, setSelectedPeriod] = useState('AM');
    const containerRef = useRef(null);

    // Initialize from value prop (expected format "HH:mm" 24h or "hh:mm AM/PM")
    useEffect(() => {
        if (value) {
            // Simple parser for "HH:mm" (24h) which is standard for input type="time"
            // But we want to support our custom format too.
            // Let's assume the parent might pass "HH:mm" (24h) if it was using standard input,
            // or "hh:mm AM/PM" if it's already using our format.
            // For consistency with the previous standard input, let's assume 24h format coming in.

            const [h, m] = value.split(':');
            if (h && m) {
                let hour = parseInt(h);
                const minute = m;
                const period = hour >= 12 ? 'PM' : 'AM';

                if (hour > 12) hour -= 12;
                if (hour === 0) hour = 12;

                setSelectedHour(String(hour).padStart(2, '0'));
                setSelectedMinute(minute);
                setSelectedPeriod(period);
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

    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
    const periods = ['AM', 'PM'];

    const handleSave = () => {
        // Convert back to 24h format for consistency with standard time inputs if needed,
        // OR keep as display format. 
        // The prompt implies "show the time", let's return a display string "hh:mm AM/PM"
        // BUT, if the parent expects 24h for sorting/logic, we should probably return that.
        // However, the `DatePicker` returns YYYY-MM-DD.
        // Let's return 24h format "HH:mm" to be compatible with the previous state logic,
        // but display "hh:mm AM/PM" in the input.

        let h = parseInt(selectedHour);
        if (selectedPeriod === 'PM' && h !== 12) h += 12;
        if (selectedPeriod === 'AM' && h === 12) h = 0;

        const time24 = `${String(h).padStart(2, '0')}:${selectedMinute}`;
        onChange({ target: { name, value: time24 } });
        setIsOpen(false);
    };

    const formatTimeDisplay = (val) => {
        if (!val) return "";
        const [h, m] = val.split(':');
        if (!h || !m) return val;

        let hour = parseInt(h);
        const period = hour >= 12 ? 'PM' : 'AM';
        if (hour > 12) hour -= 12;
        if (hour === 0) hour = 12;

        return `${String(hour).padStart(2, '0')}:${m} ${period}`;
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
                    value={formatTimeDisplay(value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 text-gray-700 bg-white cursor-pointer"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
                    <Clock size={20} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-full sm:w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6 z-50">
                    <h3 className="text-[#F57C00] font-medium mb-6">Set time</h3>

                    <div className="flex justify-center items-center gap-4 mb-8">
                        {/* Hour Column */}
                        <div className="h-32 overflow-y-auto scrollbar-hide w-12 text-center snap-y snap-mandatory">
                            <div className="h-10"></div>
                            {hours.map(h => (
                                <div
                                    key={h}
                                    onClick={() => setSelectedHour(h)}
                                    className={`h-10 flex items-center justify-center cursor-pointer snap-center transition-colors ${selectedHour === h ? 'text-gray-800 font-bold text-xl' : 'text-gray-400'}`}
                                >
                                    {h}
                                </div>
                            ))}
                            <div className="h-10"></div>
                        </div>

                        {/* Minute Column */}
                        <div className="h-32 overflow-y-auto scrollbar-hide w-12 text-center snap-y snap-mandatory">
                            <div className="h-10"></div>
                            {minutes.map(m => (
                                <div
                                    key={m}
                                    onClick={() => setSelectedMinute(m)}
                                    className={`h-10 flex items-center justify-center cursor-pointer snap-center transition-colors ${selectedMinute === m ? 'text-gray-800 font-bold text-xl' : 'text-gray-400'}`}
                                >
                                    {m}
                                </div>
                            ))}
                            <div className="h-10"></div>
                        </div>

                        {/* Period Column */}
                        <div className="h-32 overflow-y-auto scrollbar-hide w-12 text-center snap-y snap-mandatory">
                            <div className="h-10"></div>
                            {periods.map(p => (
                                <div
                                    key={p}
                                    onClick={() => setSelectedPeriod(p)}
                                    className={`h-10 flex items-center justify-center cursor-pointer snap-center transition-colors ${selectedPeriod === p ? 'text-gray-800 font-bold text-xl' : 'text-gray-400'}`}
                                >
                                    {p}
                                </div>
                            ))}
                            <div className="h-10"></div>
                        </div>
                    </div>

                    {/* Selected Preview */}
                    <div className="flex items-center justify-center gap-2 text-[#F57C00] font-bold text-xl mb-6 py-4 border-y border-gray-100">
                        <span>{selectedHour}</span>
                        <span>:</span>
                        <span>{selectedMinute}</span>
                        <span>:</span>
                        <span>{selectedPeriod}</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="flex-1 py-3 border border-orange-300 text-gray-400 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-[#F57C00] text-white rounded-xl hover:bg-[#E65100] transition-colors font-medium"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimePicker;
