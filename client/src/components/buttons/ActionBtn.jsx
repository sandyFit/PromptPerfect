import React from 'react';
import { clsx } from 'clsx';
import { Loader2, ArrowRight, ArrowRightLeft, Sparkles } from 'lucide-react';

// Pre-defined icon components that can be referenced by string
const IconMap = {
    ArrowRight: ArrowRight,
    ArrowRightLeft: ArrowRightLeft,
    Sparkles: Sparkles,
    Loader2: Loader2
};

const ActionBtn = ({ onClick, disabled, loading, icon, label }) => {
    // Determine which icon to use
    let IconComponent = null;

    if (icon) {
        // If icon is a string, look it up in our map
        if (typeof icon === 'string') {
            IconComponent = IconMap[icon];
        }
        // If icon is already a component, use it directly
        else {
            IconComponent = icon;
        }
    }

    return (
        <button
            className={clsx(
                "flex items-center px-8 py-2 bg-purple-600 text-white rounded-md shadow shadow-purple-200 hover:bg-purple-700 disabled:bg-purple-300",
                loading && "cursor-not-allowed"
            )}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    {typeof loading === 'string' ? loading : `${label}...`}
                </>
            ) : (
                <>
                    {IconComponent && <IconComponent className="mr-2" size={18} />}
                    {label}
                </>
            )}
        </button>
    );
};

export default ActionBtn;
