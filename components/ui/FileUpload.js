import React, { useRef } from 'react';
import { Plus, X, PlayCircle } from 'lucide-react';
import Image from 'next/image';

const FileUpload = ({ files = [], onFilesChange, maxFiles = 3, label }) => {
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
        onFilesChange(newFiles);
    };

    const removeFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        onFilesChange(newFiles);
    };

    const renderPreview = (file, index) => {
        const isVideo = file.type.startsWith('video/');
        const url = URL.createObjectURL(file);

        return (
            <div key={index} className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden border border-gray-200 group">
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
                <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <X size={12} />
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-3">
            {label && <label className="text-sm font-medium text-gray-600">{label}</label>}

            <div className="flex flex-wrap gap-4">
                {files.map((file, index) => renderPreview(file, index))}

                {files.length < maxFiles && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-2 border-dashed border-orange-300 bg-gray-50 flex items-center justify-center text-orange-500 hover:bg-orange-50 transition-colors"
                    >
                        <Plus size={32} />
                    </button>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,video/*"
                multiple
            />
        </div>
    );
};

export default FileUpload;
