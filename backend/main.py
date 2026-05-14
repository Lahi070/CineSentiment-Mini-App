from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing.sequence import pad_sequences
import re

app = FastAPI()

# VERY IMPORTANT: This allows your React app to talk to your Python app safely
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model and tokenizer
model = tf.keras.models.load_model('cinesentiment_model.h5')
with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

def clean_text(text):
    text = re.sub(r'<br\s*/?>', ' ', text)
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text.lower()

# Create a structure to accept text directly
class ReviewRequest(BaseModel):
    text: str

# The new endpoint that catches JSON text instead of a file
@app.post("/predict/")
async def predict_sentiment(request: ReviewRequest):
    review_text = request.text
    
    # Process it
    cleaned = clean_text(review_text)
    sequence = tokenizer.texts_to_sequences([cleaned])
    padded = pad_sequences(sequence, maxlen=200, padding='post', truncating='post')
    
    # Predict
    prediction = model.predict(padded)[0][0]
    
    return {
        "text_received": review_text[:50] + "..." if len(review_text) > 50 else review_text, 
        "positive_score": float(prediction),
        "negative_score": float(1.0 - prediction)
    }