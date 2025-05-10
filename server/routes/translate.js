const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { validatePromptsSchema } = require('../utils/schemaValidations');


/**
 * Translate prompt between different LLM formats.
 */
router.post('/translate', async (req, res) => {
    try {
        const promptToTranslate = validatePromptsSchema.safeParse(req.body);

        if (!promptToTranslate.success) {
            return res.status(400).json({
                error: 'Invalid request body',
                message: 'Missing required parameters',
                details: promptToTranslate.error.errors
            });
        }

        const { sourceModel, targetModel, sourcePrompt } = promptToTranslate.data;

        let processedTranslation = '';

        if (sourceModel === 'openai' && targetModel === 'claude') {
            // Example translation logic for OpenAI to Claude
            processedTranslation = sourcePrompt
                .replace(/\{\{(.*?)\}\}/g, '<$1>') // Convert variables
                .replace(/^System: /gm, '<instructions>\n') // Convert system prompt
                .replace(/<\/instructions>/gm, '') // Remove any existing closing tags
                .replace(/^User: /gm, '\n\nHuman: ') // Convert user messages
                .replace(/^Assistant: /gm, '\n\nAssistant: '); // Convert assistant messages

            if (processedTranslation.includes('<instructions')) {
                processedTranslation = processedTranslation.replace(/<instructions>\n(.*?)(\n\nHuman:|\n\nAssistant:|$)/s, '<instructions>\n$1\n</instructions>$2');
            }
        } else if (sourceModel === 'claude' && targetModel === 'openai') {
            // Example translation logic for Claude to OpenAI
            processedTranslation = sourcePrompt
                .replace(/<(.*?)>/g, '{{$1}}') // Convert variables
                .replace(/<instructions>(.*?)<\/instructions>/gs, 'System: $1\n') // Convert system instructions
                .replace(/Human: /g, 'User: ') // Convert human messages
                .replace(/Assistant: /g, 'Assistant: '); // Keep assistant messages
        } else if (targetModel === 'gemini') {
            // Example translation logic for Claude to Gemini
            processedTranslation = sourcePrompt
                .replace(/<instructions>(.*?)<\/instructions>/gs, '[SYSTEM]\n$1\n[/SYSTEM]\n') // Convert instructions
                .replace(/System: (.*?)(\n|$)/gs, '[SYSTEM]\n$1\n[/SYSTEM]\n') // Convert system messages
                .replace(/Human: |User: /g, '[USER]\n') // Convert user messages
                .replace(/Assistant: /g, '[MODEL]\n'); // Convert assistant messages
        } else if (targetModel.startsWith('bedrock')) {
            // Any model to Bedrock models (siplified for prototype)
            processedTranslation = sourcePrompt
                .replace(/<instructions>(.*?)<\/instructions>/gs, 'System: $1\n') // Convert instructions to system
                .replace(/Human: |User: /g, 'User: ') // Standardize user messages
                .replace(/Assistant: /g, 'Assistant: '); // Keep assistant messages
        } else {
            // Generic fallback (would be more sophisticated in a real implementation)
            processedTranslation = sourcePrompt;
        };


        // ✅ Save the Logged translations to the database for future reference
        await prisma.promptTranslation.create({
            data: {
                sourceModel,
                targetModel,
                sourcePrompt,
                translatedPrompt: processedTranslation
            }
        });


        // Respond to client with the translated prompt
        res.status(200).json({
            sourceModel,
            targetModel,
            originalPrompt: sourcePrompt,
            translatedPrompt: processedTranslation,
        });


    } catch (err) {
        console.error('Error translating prompt:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message
        });
    }
});

module.exports = router;
