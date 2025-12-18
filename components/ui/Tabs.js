import React from 'react';

const Tabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex gap-4 mb-8">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={`
            px-6 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeTab === tab.value
                            ? 'bg-[#F57C00] text-white shadow-md'
                            : 'bg-[#E0CDB8] text-gray-700 hover:bg-orange-200'
                        }
          `}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
