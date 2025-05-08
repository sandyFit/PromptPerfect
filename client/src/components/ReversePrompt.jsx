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
        <section className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
            <form className="flex flex-col ">
                <label className="block text-sm font-medium text-purple-600 mb-4.5">
                    Model Output
                    <span className="font-normal text-gray-600 ml-2">
                        — to reverse-engineer prompt
                    </span>
                </label>
                
                <PromptTextarea
                    value={reverseOutput}
                    onChange={(e) => setSourcePrompt(e.target.value)}
                    placeholder="Paste the model output you want to reverse-engineer..."
                    maxLength={5000}               
                />

                <div className="mt-2">
                    <select
                        className="block w-1/3 rounded border border-purple-300 text-purple-600 py-0.5 
                            focus:outline-none focus:ring-2 focus:border-purple-500 focus:ring-purple-500 
                            text-sm shadow-sm shadow-purple-200 "
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
                <label className="block text-sm font-medium text-purple-600 mb-4.5">
                    Inferred Prompt
                </label>

                <PromptTextarea
                    value={inferredPrompt}
                    onChange={(e) => setSourcePrompt(e.target.value)}
                    placeholder="Inferred prompt will appear here..."
                    maxLength={5000}
                    readOnly
                />

                <div className="flex gap-2 mt-2 mb-3">
                    <SmallBtn
                        icon={copiedToClipboard ? <Check size={14} /> : <Copy size={14} />}
                        legend={copiedToClipboard ? 'Copied!' : 'Copy'}
                        onClick={() => copyToClipboard(inferredPrompt)} />
                    <button
                        className="flex items-center gap-1 px-3 py-1 text-xs text-purple-600 border 
                            border-purple-300 rounded hover:bg-purple-50"
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
