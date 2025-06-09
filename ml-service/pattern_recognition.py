import re

class PatternRecognitionModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),
            max_features=10000,
            stop_words='english',
            sublinear_tf=True
        )
        self.classifier = LogisticRegression(
            multi_class='ovr',
            class_weight='balanced',
            random_state=42
        )

    def extract_features(self, prompt):
        # Keyword patterns for each technique
        patterns = {
            'chain_of_thought': [
                'step by step', 'think through', 'reasoning',
                'let\'s break', 'first.*then.*finally'
            ],
            'few_shot': [
                'example', 'for instance', 'such as',
                'here are some', 'sample.*output'
            ],
            'role_based': [
                'you are', 'act as', 'imagine you',
                'as a.*expert', 'your role'
            ]
        }

        # Extract pattern-based features
        features = {}
        for technique, pattern_list in patterns.items():
            features[f'{technique}_patterns'] = sum(
                len(re.findall(pattern, prompt.lower()))
                for pattern in pattern_list
            )

        return features
