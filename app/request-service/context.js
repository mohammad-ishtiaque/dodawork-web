"use client";
import React, { createContext, useContext, useState } from 'react';

const RequestServiceContext = createContext();

export const RequestServiceProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        category: '',
        subcategory: '',
        priority: '',
        address: '',
        description: '',
        files: []
    });

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    return (
        <RequestServiceContext.Provider value={{ formData, updateFormData }}>
            {children}
        </RequestServiceContext.Provider>
    );
};

export const useRequestService = () => {
    const context = useContext(RequestServiceContext);
    if (!context) {
        throw new Error('useRequestService must be used within a RequestServiceProvider');
    }
    return context;
};
