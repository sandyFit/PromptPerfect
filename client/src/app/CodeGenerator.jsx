import React from 'react';
import { Code } from 'lucide-react';

const CodeGenerator = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center py-12">
            <Code size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Code Generator</h3>
            <p className="text-gray-500 max-w-md mx-auto">
                Transform prompts into functional code with Amazon Q Developer's assistance.
                Supports multiple languages and frameworks.
            </p>
        </section>
    )
}

export default CodeGenerator;
