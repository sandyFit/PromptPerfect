import React from 'react'

const PrimaryBtn = ({icon, legend, onClick, activeTab}) => {
    return (
        <button onClick={onClick}
            className={`${activeTab} 
            font-medium py-2 px-4 rounded transition duration-200 ease-in-out`}>
            {icon}
            <span>{legend}</span>
        </button>
    )
}

export default PrimaryBtn;
