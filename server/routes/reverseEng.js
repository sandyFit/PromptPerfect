const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { validatePromptsSchema } = require('../utils/schemaValidations');
//const { askAmazonQ } = require('../utils/askAmazonQ'); // 🧠 Ensure this is implemented
const { suggestions: defaultSuggestions } = require('../utils/suggestions'); 

/**
 * Attempts to reverse-engineer a prompt from model output
 */
router.post('/reverse-engineer', async (req, res) => {
    try {
        const { modelOutput, modelType } = req.body;

        if (!modelOutput || !modelType) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Create a prompt for Amazon Q to reverse-engineer the original prompt
        const amazonQPrompt = `
            I have an output from a ${modelType} language model, and I need to reverse-engineer 
            what the original prompt might have been. Please analyze this output and generate a 
            plausible prompt that would likely produce this kind of response.
            
            ${modelType} Output:
            """
            ${modelOutput}
            """
            
            Please generate a plausible original prompt in ${modelType} format, considering the model's
            capabilities and response patterns.
        `;

        // Get inferred prompt from Amazon Q
        const amazonQResponse = await askAmazonQ(amazonQPrompt);

        // In a real implementation, we would parse the response from Amazon Q
        // For this prototype, we'll generate a basic inferred prompt based on the output
        let inferredPrompt = `# Inferred ${modelType} Prompt\n\n`;

        if (modelOutput.toLowerCase().includes('analysis') || modelOutput.toLowerCase().includes('overview')) {
            inferredPrompt +=
                `Please provide a detailed analysis of the following topic. Include key points, 
                historical context, and future implications.\n\nThe analysis should be structured
                with clear headings and be approximately 500 words in length.`;
        } else if (modelOutput.toLowerCase().includes('code') || modelOutput.toLowerCase().includes('function')) {
            inferredPrompt +=
                `Write a [programming language] function that [performs some task based on the output]. 
                Explain how the code works line by line and provide an example of how to use it.`;
        } else if (modelOutput.toLowerCase().includes('compare') || modelOutput.toLowerCase().includes('contrast')) {
            inferredPrompt +=
                `Compare and contrast the following concepts: [concept A] and [concept B]. Discuss their 
                similarities, differences, and relative advantages in different contexts.`;
        } else {
            inferredPrompt +=
                `Please provide information about the following topic. Include definitions, examples, and 
                practical applications. Structure your response with clear headings and subheadings.`;
        }

        res.status(200).json({
            inferredPrompt,
            rawAmazonQResponse: amazonQResponse // For debugging purposes
        });
    } catch (error) {
        console.error('Reverse engineering error:', error);
        res.status(500).json({ error: 'Failed to reverse-engineer prompt', details: error.message });
    }
});
module.exports = router;
