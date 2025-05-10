const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const { validatePromptsSchema } = require('../utils/schemaValidations');
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
         

        let formattedSuggestions = [];

        try {           
            // Extract suggestions 
            formattedSuggestions = suggestionLines.map((line, index) => ({
                id: index + 1,
                suggestion: line.trim()
            }));
        } catch (error) { 
            console.warn('Failed to extract suggestions:', error.message);
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
