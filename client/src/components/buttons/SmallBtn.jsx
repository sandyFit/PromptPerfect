import React from 'react'

const SmallBtn = ({ icon, legend, onClick}) => {
    return (
        <button onClick={onClick}
            className={`flex items-center gap-1 px-3 py-1 text-xs text-purple-600 border-2 bg-white
                border-purple-300 rounded hover:bg-purple-50  hover:border-purple-600`}>
            {icon}
            <span>{legend}</span>
        </button>
    )
}

export default SmallBtn;
