const targetOptimizations = {
    'claude': [
        'Consider using XML tags to structure complex instructions',
        'Claude responds well to step-by-step reasoning prompts',
        'Make explicit any constraints or boundaries to responses'
    ],
    'openai': [
        'Use JSON formatting for structured outputs with GPT-4',
        'Break complex tasks into clear steps',
        'Consider using few-shot examples for better results'
    ],
    'gemini': [
        'Gemini excels with multimodal content - consider adding image descriptions',
        'Use clear section headings to organize complex prompts',
        'Be explicit about the desired response format'
    ],
    'bedrock-titan': [
        'Titan performs best with clear, concise instructions',
        'Add specific examples of expected outputs',
        'Use temperature settings to control creativity vs. precision'
    ],
    'bedrock-llama': [
        'Llama 3 responds well to conversational tone',
        'Include specific examples to guide response format',
        'For complex tasks, break down into clear steps'
    ]
};

export default targetOptimizations;
