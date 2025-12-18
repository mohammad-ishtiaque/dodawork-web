"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, PlayCircle, Edit } from 'lucide-react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { useRequestService } from '../context';

const PreviewPage = () => {
    const router = useRouter();
    const { formData } = useRequestService();

    const renderFilePreview = (file, index) => {
        const isVideo = file.type.startsWith('video/');
        const url = URL.createObjectURL(file);

        return (
            <div key={index} className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200">
                {isVideo ? (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <video src={url} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <PlayCircle className="text-white w-8 h-8" />
                        </div>
                    </div>
                ) : (
                    <Image
                        src={url}
                        alt="preview"
                        fill
                        className="object-cover"
                    />
                )}
            </div>
        );
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 bg-white min-h-screen">
            {/* Header */}
            <div className="flex items-center mb-8 relative">
                <button onClick={() => router.back()} className="absolute left-0 p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-2xl font-bold text-blue-900 mx-auto">Track The Service</h1>
            </div>

            {/* Hero Image - Placeholder as per design */}
            <div className="w-full h-48 sm:h-64 relative rounded-2xl overflow-hidden mb-8">
                <Image
                    src="/COVER.png"
                    alt="Service Location"
                    fill
                    className="object-cover"
                    onError={(e) => {
                        e.target.src = "https://placehold.co/600x400?text=Service+Location"; // Fallback
                    }}
                />
            </div>

            {/* Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex gap-2">
                        <span className="text-orange-500 font-medium">Request ID:</span>
                        <span>112222</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-orange-500 font-medium">Service category:</span>
                        <span className="capitalize">{formData.category}</span>
                        <span className="text-gray-400">In Kitchen</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-orange-500 font-medium">Subcategory:</span>
                        <span className="capitalize">{formData.subcategory}</span>
                        <span className="text-gray-400">In Kitchen</span>
                    </div>

                    <div className="flex gap-2">
                        <span className="text-orange-500 font-medium">Priority:</span>
                        <span className="capitalize">{formData.priority}</span>
                    </div>

                    <div className="flex gap-2">
                        <span>Customer Phone:</span>
                        <span>431-555-5555</span>
                    </div>

                    <div className="flex gap-2">
                        <span>Date Range:</span>
                        <span>{formData.startDate} - {formData.endDate}</span>
                    </div>

                    <div className="flex gap-2">
                        <span>Time:</span>
                        <span>{formData.startTime} - {formData.endTime}</span>
                    </div>

                    <div className="flex items-start gap-2">
                        <MapPin className="text-orange-500 w-5 h-5 flex-shrink-0" />
                        <span>{formData.address}</span>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Would you like to tell us more about your request?</h2>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-gray-600 text-sm min-h-[100px]">
                    {formData.description || "No description provided."}
                </div>
            </div>

            {/* Attachments */}
            <div className="mb-8">
                <h2 className="text-sm font-medium text-gray-900 mb-4">Attachments</h2>
                <div className="flex flex-wrap gap-4">
                    {formData.files.map((file, index) => renderFilePreview(file, index))}
                    {formData.files.length === 0 && <p className="text-sm text-gray-500">No attachments.</p>}
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
                <Button variant="outline" onClick={() => router.back()} className="flex items-center justify-center gap-2">
                    <Edit size={20} />
                    Edit
                </Button>

                <Button onClick={() => router.push('/track-service')}>
                    Get Matched
                </Button>
            </div>

        </div>
    );
};

export default PreviewPage;
