const suggestions = {
    'claude': [
        'Consider using XML tags to structure complex instructions',
        'Claude responds well to step-by-step reasoning prompts',
        'Make explicit any constraints or boundaries to responses',
        'Use <thinking> tags to encourage more verbose reasoning'
    ],
    'openai': [
        'Use JSON formatting for structured outputs with GPT-4',
        'Break complex tasks into clear steps',
        'Consider using few-shot examples for better results',
        'Be explicit about the desired tone and style'
    ],
    'gemini': [
        'Gemini excels with multimodal content - consider adding image descriptions',
        'Use clear section headings to organize complex prompts',
        'Be explicit about the desired response format',
        'Balance creativity and constraint instructions'
    ],
    'bedrock-titan': [
        'Titan performs best with clear, concise instructions',
        'Add specific examples of expected outputs',
        'Use temperature settings to control creativity vs. precision',
        'Explicitly mention any length requirements'
    ],
    'bedrock-llama': [
        'Llama 3 responds well to conversational tone',
        'Include specific examples to guide response format',
        'For complex tasks, break down into clear steps',
        'Use specific context-building preambles'
    ]
};
module.exports = { suggestions };
