from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image

app = Flask(__name__)

model = tf.saved_model.load(
    "model/ecosort_savedmodel"
)

infer = model.signatures["serving_default"]

class_names = [
    "organik",
    "anorganik",
    "B3"
]

@app.route("/")
def home():
    return {"message": "Ecosort API Running"}

@app.route("/predict", methods=["POST"])
def predict():

    file = request.files["file"]

    img = Image.open(file).convert("RGB")

    img = img.resize((224,224))

    img = np.array(img)/255.0

    img = np.expand_dims(img, axis=0)

    tensor = tf.convert_to_tensor(
        img,
        dtype=tf.float32
    )

    prediction = infer(tensor)

    output_key = list(
        prediction.keys()
    )[0]

    probs = prediction[
        output_key
    ].numpy()[0]

    pred_idx = np.argmax(probs)

    return jsonify({

        "prediction":
        class_names[pred_idx],

        "confidence":
        float(probs[pred_idx])

    })

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=7860
    )