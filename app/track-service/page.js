"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, HandPlatter } from 'lucide-react';
import Tabs from '@/components/ui/Tabs';
import ServiceCard from '@/components/ui/ServiceCard';

const TrackServicePage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('pending');

    const tabs = [
        { label: 'Pending', value: 'pending' },
        { label: 'Ongoing', value: 'ongoing' },
        { label: 'Completed', value: 'completed' }
    ];

    // Mock Data
    const services = [
        {
            id: '112222',
            category: 'Induction In Kitchen',
            subcategory: 'Induction In Kitchen',
            address: 'Oldesloer Strasse 82',
            status: 'Pending',
            image: '/COVER.png' // Placeholder
        },
        {
            id: '112223',
            category: 'Induction In Kitchen',
            subcategory: 'Induction In Kitchen',
            address: 'Oldesloer Strasse 82',
            status: 'ongoing',
            image: '/COVER.png' // Placeholder
        },
        {
            id: '112224',
            category: 'Induction In Kitchen',
            subcategory: 'Induction In Kitchen',
            address: 'Oldesloer Strasse 82',
            status: 'Pending',
            image: '/COVER.png' // Placeholder
        },
        {
            id: '112225',
            category: 'Induction In Kitchen',
            subcategory: 'Induction In Kitchen',
            address: 'Oldesloer Strasse 82',
            status: 'completed',
            image: '/COVER.png' // Placeholder
        }
    ];

    const filteredServices = services.filter(service => service.status.toLowerCase() === activeTab);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full">
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-2xl font-bold text-blue-900">Track The Service</h1>
                </div>

                <button
                    onClick={() => router.push('/request-service')}
                    className="flex items-center gap-2 bg-[#F57C00] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#E65100] transition-colors shadow-md"
                >
                    <HandPlatter size={18} />
                    Service Request
                </button>
            </div>

            {/* Tabs */}
            <div className="flex justify-center">
                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredServices.map((service) => (
                    <ServiceCard key={service.id} {...service} />
                ))}

                {filteredServices.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No {activeTab} services found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackServicePage;
