

class PromptAnalyzer {
    constructor() {
        this.patterns = {
            // Existing techniques detection
            chainOfThought: /step[s\s-]*by[s\s-]*step|reasoning|think through|break down|analyze/i,
            fewShot: /example[s]?:|for instance:|e\.g\.:|sample:|here are some/i,
            roleBased: /you are|act as|take on the role|pretend to be|imagine you're/i,

            // Quality indicators
            constraints: /must not|avoid|don't|never|ensure that|make sure|requirements?:/i,
            specificity: /exactly|precisely|specifically|in detail|comprehensive|format:/i,
            creativity: /creative|innovative|unique|original|brainstorm|generate ideas/i,
            structure: /format|structure|organize|layout|template|bullet points/i,
            audience: /for beginners|for experts|for children|audience|reader/i,

            // Task types
            classification: /classify|categorize|identify|determine if|sort|group/i,
            generation: /generate|create|write|compose|produce|make/i,
            analysis: /analyze|examine|evaluate|assess|review|critique/i,
            qa: /answer|question|explain|what is|how to|why/i,
            comparison: /compare|contrast|difference|similar|versus|vs/i,

            // Domain indicators
            technical: /code|program|develop|engineer|algorithm|debug|API|function/i,
            business: /business|market|finance|strategy|plan|proposal|revenue/i,
            creative: /story|narrative|poem|creative writing|character|plot/i,
            academic: /research|paper|study|theory|academic|citation|methodology/i,
            medical: /patient|symptom|diagnosis|treatment|medical|clinical/i
        };
    }

    analyzePrompt(prompt) {
        return {
            existingTechniques: this.detectExistingTechniques(prompt),
            taskType: this.identifyTaskType(prompt),
            domain: this.identifyDomain(prompt),
            qualityMetrics: this.assessQuality(prompt),
            missingElements: this.findMissingElements(prompt),
            complexity: this.assessComplexity(prompt),
            audience: this.identifyAudience(prompt)
        };
    }

    detectExistingTechniques(prompt) {
        const techniques = {};
        for (const [technique, pattern] of Object.entries(this.patterns)) {
            if (['chainOfThought', 'fewShot', 'roleBased'].includes(technique)) {
                techniques[technique] = pattern.test(prompt);
            }
        }
        return techniques;
    }

    identifyTaskType(prompt) {
        const taskTypes = ['classification', 'generation', 'analysis', 'qa', 'comparison'];
        for (const taskType of taskTypes) {
            if (this.patterns[taskType].test(prompt)) {
                return taskType;
            }
        }
        return 'general';
    }

    identifyDomain(prompt) {
        const domains = ['technical', 'business', 'creative', 'academic', 'medical'];
        for (const domain of domains) {
            if (this.patterns[domain].test(prompt)) {
                return domain;
            }
        }
        return 'general';
    }

    assessQuality(prompt) {
        const metrics = {};
        const qualityIndicators = ['constraints', 'specificity', 'creativity', 'structure', 'audience'];

        for (const indicator of qualityIndicators) {
            metrics[indicator] = this.patterns[indicator].test(prompt);
        }

        // Calculate overall quality score
        const totalScore = Object.values(metrics).reduce((sum, val) => sum + (val ? 1 : 0), 0);
        metrics.overallScore = Math.round((totalScore / qualityIndicators.length) * 100);

        return metrics;
    }

    findMissingElements(prompt) {
        const missing = [];
        const quality = this.assessQuality(prompt);

        if (!quality.constraints) missing.push('constraints');
        if (!quality.specificity) missing.push('specificity');
        if (!quality.structure) missing.push('output_format');
        if (!quality.audience) missing.push('target_audience');

        return missing;
    }

    assessComplexity(prompt) {
        const wordCount = prompt.split(/\s+/).length;
        const sentenceCount = prompt.split(/[.!?]+/).length;
        const avgWordsPerSentence = wordCount / sentenceCount;

        if (wordCount < 20 || avgWordsPerSentence < 10) return 'low';
        if (wordCount > 100 || avgWordsPerSentence > 25) return 'high';
        return 'medium';
    }

    identifyAudience(prompt) {
        if (this.patterns.audience.test(prompt)) {
            if (/beginner|novice|new to/i.test(prompt)) return 'beginner';
            if (/expert|advanced|professional/i.test(prompt)) return 'expert';
            if (/child|kid|student/i.test(prompt)) return 'child';
        }
        return 'general';
    }
}
