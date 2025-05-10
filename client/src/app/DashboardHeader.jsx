import { useState } from 'react';
import TabButton from '../components/buttons/TabButton';
import { ArrowRightLeft, FlaskConical, TerminalSquare } from 'lucide-react';

const DashboardHeader = () => {

    const [activeTab, setActiveTab] = useState('translate');

    return (
        <header className='flex flex-col h-20 bg-gray-50 px-12 pt-4 pb-8 border-t 
            border-gray-300'>
            <div className="flex bg-gray-100 p-2 gap-2">
                <TabButton
                    id="translate"
                    to="/app/translate"
                    icon={ArrowRightLeft}
                    label="Prompt Translator"
                    activeTab={activeTab}
                    onClick={() => setActiveTab('translate')}
                />
                <TabButton
                    id="test"
                    to="/app/test"
                    icon={FlaskConical}
                    label="Test Your Prompt"
                    activeTab={activeTab}
                    onClick={() => setActiveTab('test')}
                />
                <TabButton
                    id="cli"
                    to="/app/cli"
                    icon={TerminalSquare}
                    label="CLI Tool"
                    activeTab={activeTab}
                    onClick={() => setActiveTab('cli')}
                />
            </div>
        </header>
    )
}

export default DashboardHeader;
