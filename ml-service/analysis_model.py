import re

class StructureAnalysisModel:
    def analyze_structure(self, prompt):
        features = {}

        # Structural patterns
        features['has_numbered_list'] = bool(re.search(r'\d+\.', prompt))
        features['has_bullet_points'] = bool(re.search(r'[•\-\*]', prompt))
        features['has_examples'] = self.detect_examples(prompt)
        features['has_constraints'] = self.detect_constraints(prompt)
        features['has_context'] = self.detect_context_setting(prompt)

        # Length and complexity metrics
        features['word_count'] = len(prompt.split())
        features['sentence_count'] = len(sent_tokenize(prompt))
        features['avg_sentence_length'] = features['word_count'] / max(features['sentence_count'], 1)

        # Technique-specific structural indicators
        features['cot_indicators'] = self.detect_cot_structure(prompt)
        features['few_shot_structure'] = self.detect_few_shot_structure(prompt)
        features['role_definition'] = self.detect_role_definition(prompt)

        return features

    def detect_examples(self, prompt):
        example_patterns = [
            r'example\s*\d*:',
            r'for\s+instance',
            r'such\s+as',
            r'e\.g\.',
            r'input:.*output:',
            r'question:.*answer:'
        ]
        return sum(bool(re.search(pattern, prompt.lower())) for pattern in example_patterns)
