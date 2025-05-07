import { useState } from 'react';
import { ArrowLeftRight, Check, CheckCircle, Copy, Download, Sparkles, Upload } from 'lucide-react';
import targetOptimizations from './data/targetOptimizations'; // Import target optimizations
import Navbar from './layouts/Navbar';
import PrimaryBtn from './components/PrimaryBtn';
import PromptForm from './components/PromptForm';

const models = [
    { id: 'openai', name: 'OpenAI GPT-4' },
    { id: 'claude', name: 'Anthropic Claude' },
    { id: 'gemini', name: 'Google Gemini' },
    { id: 'bedrock-titan', name: 'Amazon Titan' },
    { id: 'bedrock-llama', name: 'Bedrock Llama 3' },
];

const App = () => {

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
    const [copiedToClipboard, setCopiedToClipboard] = useState(false);



    

    const translatePrompt = () => {
        setIsTranslating(true);

        // Simulate API call with timeout
        setTimeout(() => {
            // Example translation logic (in a real app, this would be an API call)
            let translated = '';

            if (sourceModel === 'openai' && targetModel === 'claude') {
                // OpenAI to Claude translation
                translated = sourcePrompt
                    .replace(/\{\{(.*?)\}\}/g, '<$1>') // Convert variables
                    .replace(/^System: /gm, '<system>') // Convert system prompt
                    .replace(/^User: /gm, '\n\nHuman: ') // Convert user messages
                    .replace(/^Assistant: /gm, '\n\nAssistant: '); // Convert assistant messages
            } else if (sourceModel === 'claude' && targetModel === 'openai') {
                // Claude to OpenAI translation
                translated = sourcePrompt
                    .replace(/<(.*?)>/g, '{{$1}}') // Convert variables
                    .replace(/<system>(.*?)<\/system>/gs, 'System: $1\n') // Convert system prompt
                    .replace(/Human: /g, 'User: ') // Convert human messages
                    .replace(/Assistant: /g, 'Assistant: '); // Convert assistant messages
            } else {
                // Generic translation for demo purposes
                translated = `# Translated ${sourceModel} prompt for ${targetModel}\n\n${sourcePrompt}`;
            }

            setTranslatedPrompt(translated);
            setIsTranslating(false);

            // After translation, get optimization suggestions
            generateOptimizations();
        }, 1500);
    };

    const generateOptimizations = () => {
        setIsOptimizing(true);

        // Simulate API call with timeout
        setTimeout(() => {
            // Example optimization suggestions (would come from Amazon Q in actual implementation)

            setOptimizations(targetOptimizations[targetModel] || []);
            setIsOptimizing(false);
        }, 2000);
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

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4">
            <Navbar />

            <div className="bg-white rounded-lg shadow-lg p-6 flex-grow">
                <div className="flex border-b mb-6">
                    <PrimaryBtn
                        onClick={() => setActiveTab('translate')}
                        legend="Translate Prompt"
                        activeTab={activeTab === 'translate' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}
                    />
                    <PrimaryBtn
                        onClick={() => setActiveTab('reverse')}
                        legend="Reverse Engineer"
                        activeTab={activeTab === 'reverse' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500'}
                    />
                </div>

                {activeTab === 'translate' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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


                        <div className="flex justify-center lg:col-span-2 my-4">
                            <button
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 disabled:bg-gray-400"
                                onClick={translatePrompt}
                                disabled={!sourcePrompt || isTranslating}
                            >
                                {isTranslating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        Translating...
                                    </>
                                ) : (
                                    <>
                                        <ArrowLeftRight className="mr-2" size={18} />
                                        Translate Prompt
                                    </>
                                )}
                            </button>
                        </div>

                        {optimizations.length > 0 && (
                            <div className="lg:col-span-2 bg-indigo-50 p-4 rounded-md">
                                <h3 className="flex items-center text-lg font-medium text-indigo-700 mb-2">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Model Output (to reverse-engineer prompt)
                            </label>
                            <textarea
                                className="w-full h-96 p-4 border border-gray-300 rounded-md shadow-inner focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono"
                                placeholder="Paste the model output you want to reverse-engineer..."
                                value={reverseOutput}
                                onChange={(e) => setReverseOutput(e.target.value)}
                            />

                            <div className="mt-4">
                                <select
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    value={targetModel}
                                    onChange={(e) => setTargetModel(e.target.value)}
                                >
                                    {models.map(model => (
                                        <option key={model.id} value={model.id}>{model.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Inferred Prompt
                            </label>
                            <textarea
                                className="w-full h-96 p-4 border border-gray-300 rounded-md shadow-inner focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono"
                                placeholder="Inferred prompt will appear here..."
                                value={inferredPrompt}
                                readOnly
                            />

                            <div className="flex gap-2 mt-4">
                                <button
                                    className="flex items-center gap-1 px-3 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50"
                                    onClick={() => copyToClipboard(inferredPrompt)}
                                >
                                    {copiedToClipboard ? <Check size={14} /> : <Copy size={14} />}
                                    {copiedToClipboard ? 'Copied!' : 'Copy'}
                                </button>
                                <button
                                    className="flex items-center gap-1 px-3 py-1 text-xs text-indigo-600 border border-indigo-300 rounded-md hover:bg-indigo-50"
                                    onClick={() => {
                                        setActiveTab('translate');
                                        setSourcePrompt(inferredPrompt);
                                    }}
                                >
                                    Use in Translator
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center lg:col-span-2 my-4">
                            <button
                                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 disabled:bg-gray-400"
                                onClick={inferPromptFromOutput}
                                disabled={!reverseOutput || isInferring}
                            >
                                {isInferring ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                                        Inferring Prompt...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2" size={18} />
                                        Infer Original Prompt
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <footer className="mt-8 text-center text-gray-500 text-sm">
                <p>PromptPort: Cross-LLM Prompt Translator + Optimizer powered by Amazon Q</p>
                <p className="text-xs mt-1">Demonstration Project - Not for Production Use</p>
            </footer>
        </div>
    )
}

export default App
