from flask import Flask, request, jsonify

import tensorflow as tf
import numpy as np

from PIL import Image

# =========================================
# INIT FLASK
# =========================================

app = Flask(__name__)

# =========================================
# LOAD SAVED MODEL
# =========================================

loaded_model = tf.saved_model.load(
    'model/ecosort_savedmodel'
)

infer = loaded_model.signatures["serving_default"]

# =========================================
# CLASS LABELS
# =========================================

class_names = [

    "cardboard",
    "glass",
    "metal",
    "paper",
    "plastic",
    "trash",
    "organic",
    "battery",
    "clothes"
]

# =========================================
# PREPROCESS IMAGE
# =========================================

def preprocess_image(image):

    image = image.resize((224,224))

    image = np.array(image)

    image = image / 255.0

    image = np.expand_dims(image, axis=0)

    return image.astype(np.float32)

# =========================================
# HOME ROUTE
# =========================================

@app.route('/')
def home():

    return jsonify({

        "message": "Ecosort Flask API Running"
    })

# =========================================
# PREDICT ROUTE
# =========================================

@app.route('/predict', methods=['POST'])
def predict():

    # Check file
    if 'file' not in request.files:

        return jsonify({

            "error": "No file uploaded"
        })

    file = request.files['file']

    # Open image
    image = Image.open(file).convert("RGB")

    # Preprocess
    processed_image = preprocess_image(image)

    # Convert tensor
    input_tensor = tf.convert_to_tensor(
        processed_image,
        dtype=tf.float32
    )

    # Prediction
    prediction = infer(input_tensor)

    prediction_values = list(
        prediction.values()
    )[0].numpy()

    predicted_index = np.argmax(
        prediction_values
    )

    confidence = float(
        np.max(prediction_values)
    )

    predicted_class = class_names[
        predicted_index
    ]

    # Return response
    return jsonify({

        "prediction": predicted_class,

        "confidence": round(confidence * 100, 2)
    })

# =========================================
# RUN SERVER
# =========================================

if __name__ == '__main__':

    app.run(

        host='0.0.0.0',

        port=5000,

        debug=True
    )