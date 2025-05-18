import { useState } from 'react';
// import axios from 'axios';
import { ArrowRightLeft } from 'lucide-react';
import ActionBtn from '../components/buttons/ActionBtn';
import InputPromptForm from '../components/forms/InputPromptForm';
import EnhancedPromptForm from '../components/forms/EnhancedPromptForm';
import TechniquesCard from '../components/cards/TechniquesCard';

const TranslatePrompts = () => {
    const [userPrompt, setUserPrompt] = useState('');
    const [optimizedPrompt, setOptimizedPrompt] = useState('');
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [activeTab, setActiveTab] = useState('enhance');

    // const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const optimizePrompt = async () => {
        
    };

    return (
        <section className="flex flex-col text-center pt-4">
            <h3 className="text-xl font-medium text-gray-700 mb-2">
                Try Our AI-Powered Prompt Wizard
            </h3>
            <p className="text-gray-500 mx-auto">
                Start with your idea. Watch it transform into the perfect prompt with smart techniques.
            </p>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-200 
                px-12 pt-8 pb-10 mt-6 flex-grow">

                {activeTab === 'enhance' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <InputPromptForm
                            prompt={userPrompt}
                            setPrompt={setUserPrompt}
                        />

                        <EnhancedPromptForm
                            prompt={optimizedPrompt}
                            setPrompt={setOptimizedPrompt}
                        />


                        <div className="flex justify-center lg:col-span-2 -mt-7 mb-3">
                            <ActionBtn
                                onClick={optimizePrompt}
                                disabled={!userPrompt}
                                loading={isOptimizing ? "Optimizing" : false}
                                icon={ArrowRightLeft}
                                label="Make My Prompt Perfect"
                            />
                        </div>                    
                    </div>
                )};

                <TechniquesCard/>
            </div>
        </section>
    );
};

export default TranslatePrompts;
