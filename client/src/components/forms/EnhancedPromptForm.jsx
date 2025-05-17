import { useState } from 'react';
import SmallBtn from '../buttons/SmallBtn';
import { Copy } from 'lucide-react';
import models from '../../data/models';
import PromptTextarea from '../PromptTextarea';

const EnhancedPromptForm = ({ model, setModel, prompt, setPrompt }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt);
    };


    const handleExport = (e) => {
        e.preventDefault();

        // Export functionality for the translated prompt
        // This could be implemented to export as PDF or any other format, currently only implemented the 
        // .txt format
        console.log("Export functionality to be implemented");

        // Basic text file export implementation
        if (prompt) {
            const blob = new Blob([prompt], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `translated_prompt_${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
    };

    return (
        <section>
            <form className="flex flex-col" onSubmit={(e) => e.preventDefault()}>
                <header className="flex items-center gap-4 mb-4">
                    <label
                        htmlFor='targetModel'
                        className="block text-sm font-medium text-gray-900"
                    >
                        Pick a technique
                    </label>
                    <select
                        id='targetModel'
                        className="block w-64 rounded border border-gray-300 focus:outline-none focus:ring-2
                            focus:border-purple-500 focus:ring-purple-500 text-sm text-gray-800
                            shadow-sm shadow-gray-200"
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
                        onChange={(e) => {}}
                        placeholder='Enhanced prompt will appear here in your target model...'
                        maxLength={5000}
                        readOnly
                    />
                </div>

                <div className="flex gap-2 mt-2">
                    <SmallBtn
                        icon={<Copy size={14} />}
                        legend='Copy'
                        onClick={handleCopy}
                    />
                    <SmallBtn
                        legend='Export'
                        onClick={handleExport}
                        disabled={!prompt} // Disable export if no prompt is available
                    />
                </div>
            </form>
        </section>
    )
}

export default EnhancedPromptForm;
