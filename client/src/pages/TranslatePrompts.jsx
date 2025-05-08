import { useState } from 'react';
import axios from 'axios';
import { ArrowRightLeft, ScanSearch, Sparkles } from 'lucide-react';
import models from '../data/models';
import PrimaryBtn from '../components/buttons/PrimaryBtn';
import PromptForm from '../components/PromptForm';
import ReversePrompt from '../components/ReversePrompt';
import ActionBtn from '../components/buttons/ActionBtn';

const TranslatePrompts = () => {
    const [sourceModel, setSourceModel] = useState('openai');
    const [targetModel, setTargetModel] = useState('claude');
    const [sourcePrompt, setSourcePrompt] = useState('');
    const [translatedPrompt, setTranslatedPrompt] = useState('');
    const [optimizations, setOptimizations] = useState([]);
    const [isTranslating, setIsTranslating] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [activeTab, setActiveTab] = useState('translate');
    const [reverseOutput, setReverseOutput] = useState('');
    const [inferredPrompt, setInferredPrompt] = useState('');
    const [isInferring, setIsInferring] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_BASE_URL;


    const translatePrompt = async () => {
        setIsTranslating(true);
        try {
            const response = await axios.post(`${BASE_URL}/translate`, {
                sourceModel,
                targetModel,
                sourcePrompt
            });

            const { data } = response;
            setTranslatedPrompt(data.translatedPrompt);

            // Generate Optimizations after successful translation
            generateOptimizations();
        } catch (error) {
            console.error('Error translating prompt:', error);
            setTranslatedPrompt('Error translating prompt.');
        } finally {
            setIsTranslating(false);
        }
    };

    const generateOptimizations = async () => {
        setIsOptimizing(true);
        try {
            const response = await axios.post(`${BASE_URL}/optimize`, {
                targetModel,
                sourceModel
            });

            // Access data from the response
            const { data } = response;
            setOptimizations(data.optimizations || []);
        } catch (error) {
            console.error('Error optimizing prompt:', error);
            setOptimizations([]);
        } finally {
            setIsOptimizing(false);
        }
    };


    const inferPromptFromOutput = () => {
        setIsInferring(true);

        // Simulate API call with timeout
        setTimeout(() => {
            // Example inference logic (would use Amazon Q in real implementation)
            setInferredPrompt(`# Inferred ${targetModel} Prompt\n\nPlease provide a detailed analysis of the following topic. Include key points, historical context, and future implications.\n\nThe analysis should be structured with clear headings and be approximately 500 words in length.`);
            setIsInferring(false);
        }, 2500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-gray-50 px-12 pt-4 pb-8 border-t border-gray-300">

            <div className="flex mb-3 justify-center">
                <PrimaryBtn
                    onClick={() => setActiveTab('translate')}
                    icon={<ArrowRightLeft size={16}/>}
                    legend="Translate Prompt"
                    activeTab={activeTab === 'translate'
                        ? ' text-purple-600 border-b-4 border-purple-600'
                        : 'bg-white text-gray-500'}
                />
                <PrimaryBtn
                    onClick={() => setActiveTab('reverse')}
                    icon={<ScanSearch size={16}/>}
                    legend="Reverse Engineer"
                    activeTab={activeTab === 'translate'
                        ? 'bg-white text-gray-500 '
                        : 'text-purple-600 border-b-4 border-purple-600'}
                />
            </div>
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-200 px-12 pt-8 pb-3 flex-grow">

                {activeTab === 'translate' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <PromptForm
                            isSourceModel={true}
                            model={sourceModel}
                            setModel={setSourceModel}
                            prompt={sourcePrompt}
                            setPrompt={setSourcePrompt}
                        />

                        <PromptForm
                            isSourceModel={false}
                            model={targetModel}
                            setModel={setTargetModel}
                            prompt={translatedPrompt}
                            setPrompt={setTranslatedPrompt}
                        />

                        <div className="flex justify-center lg:col-span-2 -mt-7 mb-3">
                            <ActionBtn
                                onClick={translatePrompt}
                                disabled={!sourcePrompt}
                                loading={isTranslating ? "Translating" : false}
                                icon={ArrowRightLeft}
                                label="Translate Prompt"
                            />
                        </div>

                        {optimizations.length > 0 && (
                            <div className="lg:col-span-2 bg-purple-50 p-4 rounded">
                                <h3 className="flex items-center text-lg font-medium text-purple-700 mb-2">
                                    <Sparkles size={18} className="mr-2" />
                                    Optimization Suggestions for {models.find(m => m.id === targetModel)?.name}
                                </h3>
                                <ul className="list-disc pl-5 space-y-1">
                                    {optimizations.map((tip, index) => (
                                        <li key={index} className="text-gray-700">{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="">
                        <ReversePrompt
                            reverseOutput={reverseOutput}
                            setReverseOutput={setReverseOutput}
                            targetModel={targetModel}
                            setTargetModel={setTargetModel}
                            inferredPrompt={inferredPrompt}
                        />

                        <div className="flex justify-center lg:col-span-2 mt-2 mb-3">
                                <ActionBtn
                                    onClick={inferPromptFromOutput}
                                    disabled={!reverseOutput}
                                    loading={isInferring ? "Inferring Prompt" : false}
                                    icon={Sparkles}
                                    label="Infer Original Prompt"
                                />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TranslatePrompts;
