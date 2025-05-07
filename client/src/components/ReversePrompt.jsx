import React, { useState } from 'react';
import SmallBtn from './buttons/SmallBtn';
import { Copy } from 'lucide-react';
import models from '../data/models';

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
            </form>

            <form className="flex flex-col">
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
                    <SmallBtn
                        icon={copiedToClipboard ? <Check size={14} /> : <Copy size={14} />}
                        legend={copiedToClipboard ? 'Copied!' : 'Copy'}
                        onClick={() => copyToClipboard(inferredPrompt)} />
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
            </form>
        </section>
    );
};

export default ReversePrompt;
