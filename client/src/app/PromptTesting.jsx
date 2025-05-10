import { FlaskConical } from 'lucide-react';

const PromptTesting = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center py-12">
            <FlaskConical size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Prompt Testing</h3>
            <p className="text-gray-500 mx-auto">
                Generate a comprehensive test harness: run a prompt across multiple LLMs,
                compare outputs, and report differences
            </p>
        </section>
    )
}

export default PromptTesting;

