/**
 * Implements Chain of Thought enhancements:
 * 
 * Analysis: Detects existing reasoning patterns
 * Enhancement: Adds step-by-step instruction structure
 * Formatting: Creates appropriate reasoning prompts
 */

function analyzeReasoningPatterns (prompt) {
    const analysis = this.analyzer.analyzePrompt(prompt);
    const { complexity = analysis.complexity, domain = analysis.domain } = options;

    const hasStepByStep = /step[s\s-]*by[s\s-]*step|reasoning|think through|break down|analyze/i.test(prompt);
    const hasNumberedSteps = /\d+[\.\)]\s+.+/i.test(prompt);

    let enhanced = prompt.trim();

    // Add CoT instruction if not present
    if (!hasStepByStep && !hasNumberedSteps) {
        enhanced = "Think through this step-by-step:\n\n" + enhanced;
    }

    // Add explicit reasoning instruction
    if (!enhanced.includes("show your work") && !enhanced.includes("show your reasoning")) {
        enhanced += "\n\nBreak down your thinking process. For each step, explain your reasoning and show how you arrived at that conclusion.";
    }

    // Add reflection request
    if (!enhanced.includes("reflect") && !enhanced.includes("review your answer")) {
        enhanced += "\n\nAfter providing your answer, reflect on your solution and verify it makes sense.";
    }

    // Add domain-specific thinking steps
    enhanced += "\n\n" + this.generateThinkingSteps(prompt, complexity, domain);

    return enhanced;
}

function enhancePrompt (prompt, options = {}) {
    const {
        injectThinkingSteps = true,
        requireReflection = true,
        domain = null,
        complexity = "medium"
    } = options;

    let enhanced = analyzeReasoningPatterns(prompt);

    if (injectThinkingSteps) {
        enhanced += `\n\n${generateThinkingSteps(prompt, complexity, domain)}`;
    }

    return enhanced;
};

function generateThinkingSteps(prompt, complexity = "medium", domain = null) {
    const stepTemplates = {
        general: [
            "1. Understand the problem or question clearly",
            "2. Identify key elements, constraints, and requirements",
            "3. Break the task into smaller, manageable parts",
            "4. Analyze each part and look for patterns or connections",
            "5. Synthesize findings into a coherent solution",
            "6. Review and verify the final result"
        ],
        technical: [
            "1. Parse the technical requirements and constraints",
            "2. Identify the core problem and edge cases",
            "3. Consider available tools, libraries, or approaches",
            "4. Design a step-by-step implementation strategy",
            "5. Anticipate potential issues and debugging steps",
            "6. Validate the solution against requirements"
        ],
        business: [
            "1. Define the business problem and objectives",
            "2. Identify stakeholders and their interests",
            "3. Analyze market conditions and constraints",
            "4. Evaluate potential solutions and trade-offs",
            "5. Consider implementation feasibility and resources",
            "6. Assess risks and develop mitigation strategies"
        ],
        creative: [
            "1. Understand the creative brief and audience",
            "2. Brainstorm initial ideas and concepts",
            "3. Develop the most promising concepts further",
            "4. Consider tone, style, and messaging",
            "5. Refine and polish the creative output",
            "6. Review for impact and alignment with goals"
        ],
        medical: [
            "1. Review patient history and presenting symptoms",
            "2. Consider differential diagnoses based on evidence",
            "3. Evaluate relevant clinical guidelines and research",
            "4. Weigh benefits and risks of potential interventions",
            "5. Formulate evidence-based recommendations",
            "6. Consider follow-up and monitoring requirements"
        ]
    };

    const steps = stepTemplates[domain] || stepTemplates.general;
    const stepCount = complexity === "high" ? steps.length : Math.min(steps.length, 4);

    return steps.slice(0, stepCount).join("\n");
}
