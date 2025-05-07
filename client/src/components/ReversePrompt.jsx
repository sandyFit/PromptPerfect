import React, { useState } from 'react';
import SmallBtn from './buttons/SmallBtn';
import { Copy } from 'lucide-react';
import models from '../data/models';
import PromptTextarea from './PromptTextarea';

const ReversePrompt = ({
    reverseOutput,
    setReverseOutput,
    targetModel,
    setTargetModel,
    inferredPrompt,
    setSourcePrompt
}) => {

    const [copiedToClipboard, setCopiedToClipboard] = useState(false);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedToClipboard(true);
        setTimeout(() => setCopiedToClipboard(false), 2000);
    };
    return (
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <form className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model Output (to reverse-engineer prompt)
                </label>
                
                <PromptTextarea
                    value={reverseOutput}
                    onChange={(e) => setSourcePrompt(e.target.value)}
                    placeholder="Paste the model output you want to reverse-engineer..."
                    maxLength={5000}               
                />

                <div className="mt-4">
                    <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-sm"
                        value={targetModel}
                        onChange={(e) => setTargetModel(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </div>
            </form>

            <form className="flex flex-col">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inferred Prompt
                </label>

                <PromptTextarea
                    value={inferredPrompt}
                    onChange={(e) => setSourcePrompt(e.target.value)}
                    placeholder="Inferred prompt will appear here..."
                    maxLength={5000}
                    readOnly
                />

                <div className="flex gap-2 mt-4">
                    <SmallBtn
                        icon={copiedToClipboard ? <Check size={14} /> : <Copy size={14} />}
                        legend={copiedToClipboard ? 'Copied!' : 'Copy'}
                        onClick={() => copyToClipboard(inferredPrompt)} />
                    <button
                        className="flex items-center gap-1 px-3 py-1 text-xs text-purple-600 border border-purple-300 rounded-md hover:bg-purple-50"
                        onClick={() => {
                            setActiveTab('translate');
                            setSourcePrompt(inferredPrompt);
                        }}
                    >
                        Use in Translator
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ReversePrompt;
