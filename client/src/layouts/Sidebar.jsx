import { Folder, Github, Home, Linkedin, LogOut, MoreHorizontal, Plus, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className='fixed top-0 left-0 w-20 h-screen bg-gray-100 flex flex-col'>
            <nav className='text-xs uppercase flex-grow'>
                <ul className='flex flex-col justify-between items-center-safe gap-8 mt-24'>
                    <li className="flex flex-col items-center">
                        <div className='flex justify-center items-center bg-white p-2 rounded-lg 
                            w-10 h-10'>
                                <Plus size={24} className='text-gray-500 hover:text-purple-700' />
                        </div>
                        <div className=''>New</div>
                    </li>
                    <li className="flex flex-col items-center">
                        <Link to="/"
                            className='flex justify-center items-center hover:bg-white p-2 rounded-lg w-10 h-10'>
                            <Home size={24} className='text-gray-500 hover:text-purple-700' />
                        </Link>
                        <span className=''>Home</span>
                    </li>

                    <li className="flex flex-col items-center">
                        <a className='flex justify-center items-center hover:bg-white p-2 rounded-lg w-10 h-10'>
                            <Folder size={24} className='text-gray-500 hover:text-purple-700' />
                        </a>
                        <div className=''>Docs</div>
                    </li>
                </ul>
            </nav>
            
            <nav className='text-xs uppercase'>
                <ul className='flex flex-col justify-between items-center-safe gap-8 mb-8 mt-auto'>
                    <li className='flex flex-col items-center'>
                        <a className='flex justify-center items-center hover:bg-white p-2 rounded-lg 
                            w-10 h-10'>
                            <MoreHorizontal size={24} className='text-gray-500 hover:text-purple-700' />
                        </a>
                        <div className=''>More</div>
                    </li>
                    <li className='flex flex-col items-center'>
                        <a className='flex justify-center items-center hover:bg-white p-2 rounded-lg w-10 h-10'>
                            <Settings size={24} className='text-gray-500 hover:text-purple-700' />
                        </a>
                        <div className=''>Settings</div>
                    </li>
                    <li className='flex flex-col items-center'>
                        <a className='flex justify-center items-center hover:bg-white p-2 rounded-lg w-10 h-10'>
                            <LogOut size={24} className='text-gray-500 hover:text-purple-7Strategic AI Prompt Engineering00' />
                        </a>
                        <div className=''>Logout</div>
                    </li>
                </ul>                                 
            </nav>
        </aside>
    )
}

export default Sidebar;
