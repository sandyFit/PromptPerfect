import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
    return (
        <section className='w-full bg-white'>
            <div className="flex bg-gray-50">
                <DashboardHeader />
            </div>
            <main className='w-full h-[calc(100vh-80px)] bg-gray-200'>
                <Outlet />
            </main>
        </section>
    )
}

export default DashboardLayout;
