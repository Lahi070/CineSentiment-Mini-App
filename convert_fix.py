import tensorflowjs as tfjs
import tensorflow as tf
import os

# Create the folder if it doesn't exist
if not os.path.exists('frontend/public/model'):
    os.makedirs('frontend/public/model')

# Load your existing model
model = tf.keras.models.load_model('backend/cinesentiment_model.h5')

# Force convert it to the web format
tfjs.converters.save_keras_model(model, 'frontend/public/model')

print("🎉 Success! Check your frontend/public/model folder.")