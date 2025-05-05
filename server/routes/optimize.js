const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { validatePromptsSchema } = require('../utils/schemaValidations');
const { askAmazonQ } = require('../utils/askAmazonQ'); // 🧠 Ensure this is implemented
const {suggestions: defaultSuggestions} = require('../utils/suggestions'); 

/**
 * Generate optimization suggestions for a prompt based on target model.
 */
router.post('/optimize', async (req, res) => {
    try {
        const optimizedPrompt = validatePromptsSchema.safeParse(req.body);

        if (!optimizedPrompt.success) {
            return res.status(400).json({
                error: 'Invalid request body',
                message: 'Missing required parameters',
                details: optimizedPrompt.error.errors
            });
        }

        const { targetModel, sourcePrompt } = optimizedPrompt.data;

        const amazonQPrompt = `
            Please analyze this ${targetModel} prompt and provide 3–5 specific optimization suggestions
            to make it more effective for the ${targetModel} model. Consider the model's strengths,
            weaknesses, and best practices.

            Prompt:
            """
            ${sourcePrompt}
            """

            Provide numbered suggestions in a list format. Each suggestion should be clear and actionable.
            Avoid generic advice and focus on specific improvements that can be made to the prompt.
        `;

        let formattedSuggestions = [];
        let rawAmazonQResponse = '';

        try {
            rawAmazonQResponse = await askAmazonQ(amazonQPrompt);
            
            // Extract suggestions from response
            const suggestionLines = rawAmazonQResponse
                .split('\n')
                .filter(line => line.trim().match(/^\d+\./)); // e.g., "1. Do X"

            formattedSuggestions = suggestionLines.map((line, index) => ({
                id: index + 1,
                suggestion: line.trim()
            }));
        } catch (error) { 
            console.warn('Amazon Q failed, using fallback suggestions:', error.message);
            formattedSuggestions = (defaultSuggestions[targetModel] || [])
                .map((suggestion, index) => ({
                    id: index + 1,
                    suggestion
                }));
        }

        // Save to DB (optional)
        await prisma.promptOptimization.create({
            data: {
                targetModel,
                sourcePrompt,
                suggestions: JSON.stringify(formattedSuggestions)
            }
        });

        res.status(200).json({
            suggestions: formattedSuggestions,
            rawAmazonQResponse: rawAmazonQResponse || 'Fallback suggestions used.'
        });

    } catch (error) {
        console.error('Error optimizing prompt:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to generate optimization suggestions.',
            details: error.message
        });
    }
});

module.exports = router;
