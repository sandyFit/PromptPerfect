import { useState } from 'react';
import SmallBtn from '../buttons/SmallBtn';
import { Copy } from 'lucide-react';
import promptTechniques from '../../data/promptTechniques';
import PromptTextarea from '../PromptTextarea';

const EnhancedPromptForm = ({ prompt }) => {
    const [technique, setTechnique,] = useState('Select a prompt technique');

    const handleChange = (e) => {
        setTechnique(e.target.value);
    };
      

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
            // Generate a temporary URL (like a pointer) that refers to the Blob.
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
                        htmlFor='enhancedPrompt'
                        className="block w-[30%] text-sm font-medium text-gray-900 text-left"
                    >
                        Prompt wizard results 
                    </label>
                    <select
                        id="enhancedPrompt"
                        className="block w-full rounded border border-gray-300 text-sm text-gray-800
                            shadow-sm shadow-gray-200
                            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500
                            hover:border-purple-400"
                        value={technique}
                        onChange={handleChange}
                    >
                        <option value="Select a prompt technique" disabled>
                            Select a prompt technique
                        </option>
                        {promptTechniques.map((technique) => (
                            <option key={technique.key} value={technique.key}>
                                {technique.example} — ({technique.name})
                            </option>
                        ))}
                    </select>


                </header>

                <div className="relative">
                    <PromptTextarea
                        value={prompt}
                        onChange={(e) => {}}
                        placeholder='Let our wizard refine your prompt — see the result here.'
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
