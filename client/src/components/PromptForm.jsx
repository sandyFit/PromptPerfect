import React from 'react';
import SmallBtn from './buttons/SmallBtn';
import { Copy, Upload, Download } from 'lucide-react';
import models from '../data/models';
import PromptTextarea from './PromptTextarea';


const PromptForm = ({ isSourceModel, model, setModel, prompt, setPrompt }) => {
    return (
        <article>
            <form className="flex flex-col">
                <header className="flex items-center gap-4 mb-4">
                    <label
                        htmlFor={isSourceModel ? 'sourceModel' : 'targetModel'}
                        className="block text-sm font-medium text-gray-900"
                    >
                        {isSourceModel ? 'Source Model' : 'Target Model'}
                    </label>
                    <select
                        id={isSourceModel ? 'sourceModel' : 'targetModel'}
                        className="block w-64 rounded border border-gray-300 focus:outline-none focus:ring-2 
                            focus:border-purple-500 focus:ring-purple-500 text-sm text-gray-800
                            shadow-sm shadow-purple-200"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    >
                        {models.map(model => (
                            <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                    </select>
                </header>

                <div className="relative">
                    <PromptTextarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        readOnly={!isSourceModel}
                        placeholder={isSourceModel ? 'Choose your source model and paste your prompt here...'
                            : 'Translated prompt will appear here in your target model...'}
                        maxLength={5000}
                    />
                </div>



                <div className="flex gap-2 mt-2 ">
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
