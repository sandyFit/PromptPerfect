import { useState } from 'react';
import { ArrowRightLeft, Sparkles, Code, MessageSquare, TerminalSquare } from 'lucide-react';

export default function PromptPerfectDemo() {
  const [activeTab, setActiveTab] = useState('translate');
  const [sourceModel, setSourceModel] = useState('openai');
  const [targetModel, setTargetModel] = useState('claude');
  const [sourcePrompt, setSourcePrompt] = useState('Write a detailed analysis of renewable energy trends over the last decade, with a focus on solar and wind power adoption rates globally.');
  const [translatedPrompt, setTranslatedPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizations, setOptimizations] = useState([]);
  const [responsePreview, setResponsePreview] = useState('');
  
  const models = [
    { id: 'openai', name: 'OpenAI GPT-4' },
    { id: 'claude', name: 'Anthropic Claude' },
    { id: 'gemini', name: 'Google Gemini' },
    { id: 'bedrock', name: 'Amazon Bedrock' },
    { id: 'mistral', name: 'Mistral AI' }
  ];
  
  const handleTranslate = () => {
    setIsProcessing(true);
    
    // Simulate processing with Amazon Q Developer
    setTimeout(() => {
      if (sourceModel === 'openai' && targetModel === 'claude') {
        setTranslatedPrompt(`I'd like a comprehensive analysis covering:

          1. Global renewable energy trends over the past decade (2015-2025)
          2. Specific adoption rates for solar and wind technologies
          3. Regional comparisons and notable case studies
          4. Major factors driving growth or challenges
          5. Economic implications including job creation and investment trends

          Please structure this with clear sections, include quantitative data where available, and conclude with future outlook predictions.`);
                  
                  setOptimizations([
                    "Claude responds well to numbered lists that break down complex requests",
                    "Explicitly requesting structure helps Claude organize responses better",
                    "Adding a specific timeframe (2015-2025) provides clear boundaries",
                    "Requesting quantitative data signals Claude to include specific statistics",
                    "Asking for a conclusion signals a well-structured response"
                  ]);
                  
                  setResponsePreview(`# Renewable Energy Trends: A Decade in Review (2015-2025)

          ## 1. Global Overview
          The past decade has witnessed unprecedented growth in renewable energy adoption globally. Total installed capacity has increased from approximately 1,701 GW in 2015 to over 3,400 GW by 2025, representing a 100% increase. This growth has been primarily driven by...

          ## 2. Solar Power Adoption
          Solar photovoltaic (PV) technology has seen the most dramatic growth, with global capacity expanding from 227 GW in 2015 to approximately 1,180 GW by 2025, a 419% increase. Key developments include:...`);
                } else {
                  setTranslatedPrompt(`Generate a comprehensive analysis of global renewable energy trends from 2015-2025, with particular emphasis on solar and wind power adoption. Include statistical data on growth rates, regional comparisons, driving factors, economic impacts, and future projections.`);
                  
                  setOptimizations([
                    `${targetModel === 'gemini' ? 'Gemini' : models.find(m => m.id === targetModel).name} performs well with concise, directive prompts`,
                    "Removed unnecessary structural guidance that's implicit",
                    "Maintained all key requirements in a more compact format",
                    "Specified the need for statistical data directly"
                  ]);
                  
                  setResponsePreview(`# Global Renewable Energy Trends: 2015-2025
          (Analysis generated based on the translated prompt...)

          The past decade has marked a pivotal transformation in the global energy landscape, with renewable sources increasingly displacing conventional fossil fuels. This analysis examines the significant trends in renewable energy adoption between 2015 and 2025, with particular focus on solar and wind technologies.`);
          }
          
          setIsProcessing(false);
        }, 1500);
      };
  
  const TabButton = ({ id, icon, label }) => {
    const Icon = icon;
    return (
      <button 
        onClick={() => setActiveTab(id)}
        className={`flex items-center px-4 py-2 rounded-t-lg ${activeTab === id 
          ? 'bg-white border-t border-l border-r border-gray-200 text-purple-600 font-medium' 
          : 'bg-gray-50 text-gray-700'}`}
      >
        <Icon size={18} className="mr-2" />
        {label}
      </button>
    );
  };
  
  return (
    <div className="flex flex-col bg-gray-50 rounded-lg overflow-hidden shadow-lg">
      <div className="flex bg-gray-100 p-2 gap-2">
        <TabButton id="translate" icon={ArrowRightLeft} label="Prompt Translator" />
        <TabButton id="code" icon={Code} label="Code Generator" />
        <TabButton id="cli" icon={TerminalSquare} label="CLI Tool" />
      </div>
      
      <div className="p-6 bg-white flex-grow">
        {activeTab === 'translate' && (
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-gray-700">Source Prompt</label>
                <select 
                  value={sourceModel}
                  onChange={(e) => setSourceModel(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={sourcePrompt}
                onChange={(e) => setSourcePrompt(e.target.value)}
                className="border border-gray-300 rounded-md p-3 h-40 mb-4 resize-none font-mono text-sm"
              />
            </div>
            
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="font-medium text-gray-700">Translated Prompt</label>
                <select 
                  value={targetModel}
                  onChange={(e) => setTargetModel(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>{model.name}</option>
                  ))}
                </select>
              </div>
              <textarea
                value={translatedPrompt}
                onChange={(e) => setTranslatedPrompt(e.target.value)}
                className="border border-gray-300 rounded-md p-3 h-40 mb-4 resize-none font-mono text-sm"
                placeholder="Translated prompt will appear here..."
              />
            </div>
            
            <div className="col-span-2 flex justify-center">
              <button
                onClick={handleTranslate}
                disabled={isProcessing}
                className="flex items-center px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
              >
                {isProcessing ? (
                  <>
                    <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Translating...
                  </>
                ) : (
                  <>
                    <ArrowRightLeft size={18} className="mr-2" />
                    Translate with Amazon Q Developer
                  </>
                )}
              </button>
            </div>
            
            {optimizations.length > 0 && (
              <div className="bg-purple-50 p-4 rounded-md border border-purple-100">
                <h3 className="flex items-center text-purple-800 font-medium mb-2">
                  <Sparkles size={18} className="mr-2" />
                  Optimization Suggestions for {models.find(m => m.id === targetModel)?.name}
                </h3>
                <ul className="pl-6 space-y-1 list-disc text-purple-700 text-sm">
                  {optimizations.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {responsePreview && (
              <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="flex items-center text-gray-800 font-medium mb-2">
                  <MessageSquare size={18} className="mr-2" />
                  Response Preview
                </h3>
                <div className="text-gray-700 text-sm whitespace-pre-line">
                  {responsePreview}
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'code' && (
          <div className="text-center py-12">
            <Code size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Code Generator</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Transform prompts into functional code with Amazon Q Developer's assistance.
              Supports multiple languages and frameworks.
            </p>
          </div>
        )}
        
        {activeTab === 'cli' && (
          <div className="text-center py-12">
            <TerminalSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">CLI Integration</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Access PromptPerfect directly from your terminal with our CLI tool
              powered by Amazon Q Developer.
            </p>
            <div className="bg-gray-900 text-gray-300 rounded-md p-4 mt-6 text-left font-mono text-sm max-w-lg mx-auto">
              <div>$ promptperfect translate --from openai --to claude "Write about renewable energy"</div>
              <div className="opacity-70 mt-2">Translating prompt with Amazon Q Developer...</div>
              <div className="text-green-400 mt-1">[✓] Translation complete!</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
