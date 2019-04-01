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
    import json
    input_df = pd.DataFrame([np.array(request.json)])
    input_json = input_df.to_json(orient="split")
    response_text = _query_rest_endpoint(
        input_json=input_json, endpoint_address=model_invocation_endpoint)
    output = dict(enumerate(json.loads(response_text)[0]))
    return jsonify(fully_connected=output,convolutional=output)

def _query_rest_endpoint(input_json, endpoint_address):
    import requests
    headers = {'Content-type': 'application/json'}
    response = requests.post(endpoint_address, data=input_json, headers=headers)
    return response.text

def _query_sagemaker_endpoint(input_json, endpoint_name):
    import boto3
    client = boto3.session.Session().client("sagemaker-runtime", "us-west-2")
    response = client.invoke_endpoint(
      EndpointName=endpoint_name,
      Body=input_json,
      ContentType='application/json; format=pandas-split',
    )
    preds = response['Body'].read().decode("ascii")
    return preds
