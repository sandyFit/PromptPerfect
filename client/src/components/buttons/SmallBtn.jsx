import React from 'react'

const SmallBtn = ({ icon, legend, onClick}) => {
    return (
        <button onClick={onClick}
            className={`flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 rounded-md 
                hover:bg-purple-100 hover:text-purple-600 hover:border-purple-600`}>
            {icon}
            <span>{legend}</span>
        </button>
    )
}

export default SmallBtn;
