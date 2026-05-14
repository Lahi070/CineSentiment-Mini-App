import tensorflow as tf
import json
import os

# 1. Load the model
model = tf.keras.models.load_model('backend/cinesentiment_model.h5')

# 2. Path to your public folder
target_dir = 'frontend/public/model'
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

# 3. Save the model weights in a way React can read
# Since the tool is broken, we will save it as a simple JSON/Weights pair
model.save(os.path.join(target_dir, 'saved_model'))

print("Attempting specialized conversion...")
import tensorflowjs as tfjs
try:
    tfjs.converters.save_keras_model(model, target_dir)
    print("🎉 SUCCESS! Check your frontend/public/model folder now.")
except Exception as e:
    print(f"Still failing due to: {e}")
    print("PLAN B: If this fails, we will use the simplified word-matcher but with the original UI.")