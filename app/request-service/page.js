"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import FileUpload from '@/components/ui/FileUpload';
import DatePicker from '@/components/ui/DatePicker';
import TimePicker from '@/components/ui/TimePicker';
import { useRequestService } from './context';

const RequestServicePage = () => {
    const router = useRouter();
    const { formData, updateFormData } = useRequestService();
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleFilesChange = (newFiles) => {
        updateFormData({ files: newFiles });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        const newErrors = {};
        if (!formData.startDate) newErrors.startDate = 'Required';
        if (!formData.endDate) newErrors.endDate = 'Required';
        if (!formData.startTime) newErrors.startTime = 'Required';
        if (!formData.endTime) newErrors.endTime = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        router.push('/request-service/preview');
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center mb-8 relative">
                <button onClick={() => router.back()} className="absolute left-0 p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-blue-900 mx-auto">Request a Service</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Date Range */}
                <div className="space-y-4">
                    <h2 className="text-sm font-medium text-gray-700">Service Date Range</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DatePicker
                            label="Started Date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            placeholder="mm/dd/yyyy"
                        />
                        <DatePicker
                            label="End Date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            placeholder="mm/dd/yyyy"
                        />
                    </div>
                </div>

                {/* Time Range */}
                <div className="space-y-4">
                    <h2 className="text-sm font-medium text-gray-700">Service Time Range</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TimePicker
                            label="Started Time"
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleChange}
                            placeholder="hh:mm am"
                        />
                        <TimePicker
                            label="End Date" // Typo in design, keeping as is per request
                            name="endTime"
                            value={formData.endTime}
                            onChange={handleChange}
                            placeholder="hh:mm am"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-4">
                    <Select
                        label="Category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        options={[
                            { label: 'Cleaning', value: 'cleaning' },
                            { label: 'Plumbing', value: 'plumbing' },
                            { label: 'Electrical', value: 'electrical' }
                        ]}
                        placeholder="Select category"
                    />

                    <Select
                        label="Subcategory"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleChange}
                        options={[
                            { label: 'Deep Cleaning', value: 'deep-cleaning' },
                            { label: 'Maintenance', value: 'maintenance' }
                        ]}
                        placeholder="Select subcategory"
                    />
                </div>

                {/* Priority */}
                <Select
                    label="Service priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={[
                        { label: 'High', value: 'high' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Low', value: 'low' }
                    ]}
                    placeholder="Select your service priority"
                />

                {/* Address */}
                <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your addres"
                />

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-600">Would you like to tell us more about your request?</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter your request"
                        className="w-full px-4 py-3 border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-400 text-gray-700 min-h-[120px] resize-none"
                    />
                </div>

                {/* File Upload */}
                <FileUpload
                    label="Add Photo or video"
                    files={formData.files}
                    onFilesChange={handleFilesChange}
                />

                {/* Submit Button */}
                <div className="pt-4">
                    <Button type="submit">Confirm</Button>
                </div>

            </form>
        </div>
    );
};

export default RequestServicePage;
