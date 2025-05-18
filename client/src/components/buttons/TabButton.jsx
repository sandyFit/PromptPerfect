import { Link } from 'react-router-dom';

const TabButton = ({ id, icon, label, activeTab, onClick, to }) => {
    const Icon = icon;
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`flex items-center px-4 py-2 rounded-t-lg ${activeTab === id
                ? 'bg-purple-50 border-t border-l border-r border-gray-200 text-purple-700 font-medium'
                : 'bg-gray-50 text-gray-700'}`}
        >
            <Icon size={18} className="mr-2" />
            {label}
        </Link>
    );
};

export default TabButton;
