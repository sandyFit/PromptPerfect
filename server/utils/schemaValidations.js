// utils/validations.js
const { z } = require('zod');
const { allowedModels } = require('../constants/models');

const validatePromptsSchema = z.object({
    sourceModel: z.enum(allowedModels),
    targetModel: z.enum(allowedModels),
    sourcePrompt: z
        .string()
        .trim()
        .min(10, 'Prompt is too short. Minimum 10 characters required.')
        .max(4000, 'Prompt exceeds maximum length of 4000 characters.')
}).refine(data => data.sourceModel !== data.targetModel, {
    message: 'Source and target models must be different',
    path: ['targetModel']
});

module.exports = { validatePromptsSchema };
