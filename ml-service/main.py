from fastapi import FastAPI 
from pydantic import BaseModel
import joblib
 
app = FastAPI()

# Load pre-trained classifier and vectorizer
classifier = joblib.load("classifier.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

class PromptInput(BaseModel):
    promt: str

@app.post("/analyze")
def analyze_prompt(input: PromptInput):
    X = vectorizer.transform([input.prompt])
    prediction = classifier.predict(X)[0]
    return { "chainOfThoughtDetected" : bool(prediction)}
