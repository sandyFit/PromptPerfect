import { TerminalSquare } from "lucide-react";

const CliIntegration = () => {
    return (
        <section className="text-center py-12">
            <TerminalSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
                PromptPerfect-CLI: Command Line Interface
            </h3>
            <p className="text-gray-500 mx-auto">
                 
                Access PromptPerfect directly from your terminal with our CLI tool
                for effortless prompt translation and optimization.
            </p>
            <div className="bg-gray-900 text-gray-300 rounded-md p-4 mt-6 text-left font-mono 
                text-sm max-w-4xl mx-auto">
                <div>$ promptperfect translate --from openai --to claude "Write about renewable energy"</div>
                <div className="opacity-70 mt-2">Translating prompt with Amazon Q Developer...</div>
                <div className="text-green-400 mt-1">[✓] Translation complete!</div>
            </div>
        </section>
    )
}

export default CliIntegration
