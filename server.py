#Copyright (c) 2016-2017 Shafeen Tejani. Released under GPLv3.
"""
    MNIST Classifier

    An API to classify 28x28 pixel images according to pre-trained
    MNIST neural networks
"""
import os

import numpy as np

DEFAULT_MODEL_SERVER_URL = "http://127.0.0.1:5000"

model_server_url = os.environ.get("MODEL_SERVER_URL", DEFAULT_MODEL_SERVER_URL)
model_invocation_endpoint = "{server_url}/invocations".format(server_url=model_server_url)

from flask import Flask, jsonify, render_template, request

app = Flask(__name__, static_folder="./build", static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/mnist/evaluate', methods=['POST'])
def evaluate():
    import pandas as pd
    import numpy as np
    with open("/tmp/data.json", "w") as f:
        import json
        input_df = pd.DataFrame([np.array(request.json)])
        input_json = input_df.to_json(orient="split")

    import requests
    headers = {'Content-type': 'application/json'}
    response = requests.post(model_invocation_endpoint, data=input_json, headers=headers)
    print(response.text)

    output = dict(enumerate(json.loads(response.text)[0]))
    return jsonify(fully_connected=output,convolutional=output)
