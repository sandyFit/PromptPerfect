import React, { useState } from 'react';
import SmallBtn from './SmallBtn';
import { Copy, Upload } from 'lucide-react';


const models = [
    { id: 'openai', name: 'OpenAI GPT-4' },
    { id: 'claude', name: 'Anthropic Claude' },
    { id: 'gemini', name: 'Google Gemini' },
    { id: 'bedrock-titan', name: 'Amazon Titan' },
    { id: 'bedrock-llama', name: 'Bedrock Llama 3' },
];

const PromptForm = () => {
    const [isSourceModel, setIsSourceModel] = useState(true);
    const [sourceModel, setSourceModel] = useState('openai');
    const [targetModel, setTargetModel] = useState('claude');
    const [sourcePrompt, setSourcePrompt] = useState('');
    const [targetPrompt, setTargetPrompt] = useState('');

    return (
        <article>
            <form className="flex flex-col">
                <header className="flex items-center justify-between mb-4">
                    <label
                        htmlFor="sourceModel"
                        className="block text-sm font-medium text-gray-700">
                        Source Model
                    </label>
                    <select
                        id="sourceModel"
                        className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        value={sourceModel}
                        onChange={(e) => setSourceModel(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </header>

                <textarea
                    className="w-full h-96 p-4 border border-gray-300 rounded-md shadow-inner focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono"
                    placeholder="Paste your source prompt here..."
                    value={sourcePrompt}
                    onChange={(e) => setSourcePrompt(e.target.value)}
                />

                <div className="flex gap-2 mt-4">
                    <SmallBtn
                        icon={isSourceModel ?  <Upload size={14} /> : <Copy size={14} />}
                        legend={isSourceModel ? 'Import' : 'Copy'}
                        onClick={() => {/* File upload logic */ }}
                    />
                    <SmallBtn
                        icon={!isSourceModel && <Download size={14} />}
                        legend={isSourceModel ? 'Examples' : 'Export'}
                        onClick={() => {/* Example load logic */ }}
                    />
                </div>
            </form>
        </article>
    )
}

export default PromptForm;
