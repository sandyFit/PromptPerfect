import React from 'react';
import { clsx } from 'clsx'; 
import { Loader2 } from 'lucide-react';

const ActionBtn = ({ onClick, disabled, loading, icon: Icon, label }) => {
    return (
        <button
            className={clsx(
                "flex items-center px-4 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 disabled:bg-purple-300",
                loading && "cursor-not-allowed"
            )}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? (
                <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    {label}...
                </>
            ) : (
                <>
                    {Icon && <Icon className="mr-2" size={18} />}
                    {label}
                </>
            )}
        </button>
    );
};

export default ActionBtn;
