import React from 'react';
import Image from 'next/image';
import { MapPin } from 'lucide-react';

const ServiceCard = ({ id, category, subcategory, address, status, image }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col sm:flex-row mb-4">
            {/* Image Section */}
            <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
                <Image
                    src={image || "/placeholder.jpg"}
                    alt={category}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-4 relative">
                {/* Status Badge */}
                <div className="absolute top-4 right-4 bg-[#F57C00] text-white text-xs font-medium px-3 py-1 rounded-md">
                    {status}
                </div>

                <div className="space-y-2 mt-2 sm:mt-0">
                    <div className="flex gap-1 text-sm">
                        <span className="text-orange-500 font-medium">Request ID:</span>
                        <span className="text-gray-600">{id}</span>
                    </div>

                    <div className="flex gap-1 text-sm">
                        <span className="text-gray-600">Category :</span>
                        <span className="text-gray-800">{category}</span>
                    </div>

                    <div className="flex gap-1 text-sm">
                        <span className="text-gray-600">Subcategory:</span>
                        <span className="text-gray-800">{subcategory}</span>
                    </div>

                    <div className="flex items-start gap-1 text-sm mt-2">
                        <MapPin className="text-orange-500 w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{address}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
