import React from 'react';

const PromptTextarea = ({
    value,
    onChange,
    placeholder = '',
    maxLength = 5000,
    readOnly = false,
    label
}) => {
    return (
        <div className="relative">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>}

            <textarea
                className={`w-full h-60 p-4 pr-20 border-2 border-purple-300 rounded-md shadow-inner 
                    shadow-gray-200 text-sm font-mono resize-none focus:outline-none focus:ring-2 
                    focus:ring-purple-500 bg-white focus:border-purple-500
                    ${readOnly ? 'text-gray-600' : ''}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
                readOnly={readOnly}
            />


            <div className="absolute bottom-2 right-4 text-xs text-gray-400">
                {value.length} / {maxLength} characters
            </div>
        </div>
    );
};

export default PromptTextarea;
