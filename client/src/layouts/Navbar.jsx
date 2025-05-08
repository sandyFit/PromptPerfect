import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { ArrowRight } from 'lucide-react';

const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isDashboard, setIsDashboard] = useState(false);

    useEffect(() => {
        setIsDashboard(location.pathname === '/');
    }, [location.pathname]);


    return (
        <header className='w-full h-[80px] flex justify-between items-center px-24 pt-3 pb-6 z-50'>

            <Link to="/" className="text-xl font-bold">
                PromptPerfect
            </Link>
            <div className="flex text-sm gap-8">
                <a href="https://github.com/sandyFit/promptport.git">GitHub</a>
                <a href="#">Documentation</a>
            </div>
            <div className="">
                <button onClick={isDashboard ? () => navigate('/app') : () => navigate('/')}
                    className="flex items-center gap-1 px-3 py-2.5 border-2 border-purple-600 
                        text-purple-600 rounded hover:bg-purple-100 hover:text-purple-600
                        hover:border-purple-600 text-xs uppercase font-medium">
                    <span>{isDashboard ? 'Go to App' : 'Go to Home'}</span>
                    <ArrowRight size={16} />
                </button>
            </div>
        </header>
    )
}

export default Navbar;

