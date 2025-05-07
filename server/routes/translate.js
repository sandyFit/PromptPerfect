const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { validatePromptsSchema } = require('../utils/schemaValidations');

/**
 * Helper function to run Amazon Q Developer CLI commands.
 * @param {string} prompt - The prompt to send to Amazon Q
 * @returns {Promise<string>} - The response from Amazon Q
 * @throws {Error} - If the command fails
 * @description This function runs the Amazon Q Developer CLI command with the provided prompt 
 * and returns the response.
 * It uses the child_process module to execute the command and returns a promise that resolves 
 * with the response.
 */

const askAmazonQ = async (prompt) => {
    // This is a placeholder for the actual implementation of the Amazon Q command.
    // You would replace this with the actual command to run Amazon Q Developer CLI commands.

    return new Promise((resolve, reject) => {
        // Simulate API call with timeout
        setTimeout(() => {
            // Example response from Amazon Q (would come from Amazon Q in actual implementation)
            const response = `# Answer from Amazon Q\n\n${prompt}`;
            resolve(response);
        }, 1500);
    });
};

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

        // Compose a translation request for Amazon Q
        const amazonQPrompt = `
            I need you to translate the following prompt from ${sourceModel} format 
            to ${targetModel} format.
            Please maintain the same functionality, intent, tone, and structure while adapting
            it to the target model's best practices and guidelines.
            
            Source Prompt (${sourceModel} format): 
            """
            ${sourcePrompt}
            """
            
            Please translate the above prompt to ${targetModel} format, preserving all functionality and intent.
            `;

        // Call the Amazon Q (simulated for now)
        const translatedPrompt = await askAmazonQ(amazonQPrompt);

        // In a real implementation, we would parse the response from Amazon Q
        // For this prototype, we'll use a simple translation mapping
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
            rawAmazonQResponse: translatedPrompt
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
