import React from 'react'

const PrimaryBtn = ({icon, legend, onClick, activeTab}) => {
    return (
        <button onClick={onClick}
            className={`${activeTab} 
            font-medium py-2 px-8 transition duration-200 ease-in-out flex items-center gap-3`}>
            {icon}
            <span>{legend}</span>
        </button>
    )
}

export default PrimaryBtn;
