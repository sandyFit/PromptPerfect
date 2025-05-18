import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';
import Sidebar from '../layouts/Sidebar';

const DashboardLayout = () => {
    return (
        <section className='flex bg-gray-100'>
            <Sidebar />
            <div className="flex-1 flex-col pl-20 pr-10">
                <DashboardHeader />
                
                <main className='flex-1 overflow-y-auto mb-6'>
                    <Outlet />
                </main>
            </div>
        </section>
    )
}

export default DashboardLayout;
