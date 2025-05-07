import React, { useState } from 'react';
import SmallBtn from './SmallBtn';
import { Copy, Upload, Download } from 'lucide-react';
import  models  from '../data/models';




const PromptForm = ({ isSourceModel, model, setModel, prompt, setPrompt }) => {
    return (
        <article>
            <form className="flex flex-col">
                <header className="flex items-center justify-between mb-4">
                    <label
                        htmlFor={isSourceModel ? 'sourceModel' : 'targetModel'}
                        className="block text-sm font-medium text-gray-700"
                    >
                        {isSourceModel ? 'Source Model' : 'Target Model'}
                    </label>
                    <select
                        id={isSourceModel ? 'sourceModel' : 'targetModel'}
                        className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </header>

                <textarea
                    className="w-full h-96 p-4 border border-gray-300 rounded-md shadow-inner focus:ring-indigo-500 focus:border-indigo-500 text-sm font-mono"
                    placeholder={isSourceModel ? "Paste your source prompt here..." : "Translated prompt will appear here..."}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    readOnly={!isSourceModel}
                />


                <div className="flex gap-2 mt-4">
                    <SmallBtn
                        icon={isSourceModel ? <Upload size={14} /> : <Copy size={14} />}
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
};

export default PromptForm;
