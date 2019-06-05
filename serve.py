from flask import Flask, request, render_template, jsonify, Response, redirect, session
import random
from flask_cors import CORS, cross_origin
import requests
import base64
import numpy as np
import json
import io
import os
from time import perf_counter
from PIL import Image
import keras
import tensorflow as tf
import pandas as pd
from keras import backend as k
from keras.models import Sequential
from keras.models import load_model
from keras.models import model_from_json
from keras.preprocessing.image import ImageDataGenerator
from keras.preprocessing.image import img_to_array
from flaskext.mysql import MySQL
from werkzeug import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

mysql = MySQL()

app = Flask(__name__,
            static_folder="dist",
            template_folder="dist")
# app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'pestfull'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['JWT_SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/'
mysql.init_app(app)
# app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
# app.config['SESSION_TYPE'] = 'filesystem'
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


@app.route('/api/random')
def random_number():
    response = {
        'randomNumber': random.randint(1, 100)
    }
    return jsonify(response)


def get_model():
    global model
    global graph
    model = load_model('model1.hdf')
    print(" * Model loaded")
    graph = tf.get_default_graph()


print(" * Loading model...")
get_model()


def preprocess_image(image, target_size):
    if image.mode != 'RGB':
        image = image.convert('RGB')
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    # image = imagenet_utils.preprocess_input(image)

    return image


@app.route('/api/predict', methods=['GET', 'POST'])
@cross_origin(allow_headers=['Content-Type'])
def predict():
    try:
        if request.method == 'POST':
            #_user = request.get_json()['email']
            conn = mysql.connect()
            cur = conn.cursor()
            ima = request.files["file"]
            imag = ima.read()
            images = Image.open(io.BytesIO(imag))
            image = preprocess_image(images, target_size=(150, 150))
            with graph.as_default():
                preds = model.predict(image).tolist()

            rslts = preds[0][0]

            basepath = os.path.dirname(__file__)
            file_path = os.path.join(
                basepath, 'uploads', secure_filename(ima.filename))
            ima.save(file_path)

            if rslts == 1:
                predict = 'Mango Seed Weevil'
            elif rslts == 0:
                predict = 'Fall Armyworm'
            else:
                predict = 'New Pest Identified'

            cur.execute("insert into results(pest_name,image)values('" +
                        predict + "', '" + ima.filename + "')")
            conn.commit()

            inf = []
            pred = {
                'prediction': predict,
                'image': ima.filename
            }
            inf.append(pred)

            return jsonify(inf)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/signup', methods=['POST', 'GET'])
@cross_origin(allow_headers=['Content-Type'])
def signUp():
    try:
        if request.method == 'POST':
            _email = request.get_json()['email']
            _password = request.get_json()['password']
            # validate the received values
            if _email and _password:

                # All Good, let's call MySQL

                conn = mysql.connect()
                cur = conn.cursor()
                _hashed_password = bcrypt.generate_password_hash(
                    _password).decode('utf-8')
                cur.callproc('sp_createUser', (_email, _hashed_password))
                data = cur.fetchall()

                if len(data) is 0:
                    conn.commit()
                    return jsonify({'message': 'Registered successfully!'})
                else:
                    return jsonify({'error': str(data[0])})
            else:
                return jsonify({'html': '<span>Enter the required fields</span>'})

    except Exception as e:
        return jsonify({'error': str(e)})
    cur.close()
    conn.close()


@app.route('/api/login', methods=['POST', 'GET'])
@cross_origin(allow_headers=['Content-Type'])
def validateLogin():
    try:
        if request.method == 'POST':
            _email = request.get_json()['email']
            _password = request.get_json()['password']

            # connect to mysql
            conn = mysql.connect()
            cur = conn.cursor()
            cur.callproc('sp_validateLogin', (_email,))
            data = cur.fetchall()

            if len(data) > 0:
                if bcrypt.check_password_hash(str(data[0][2]), _password):
                    session['user'] = data[0][1]
                    return jsonify(session['user'])
                else:
                    return jsonify({'error': 'Wrong Email address or Password.'})
            else:
                return jsonify({'message': 'Wrong Email address or Password.'})

    except Exception as e:
        return jsonify({'error': str(e)})
    cur.close()
    conn.close()


@app.route('/api/results', methods=['GET', 'POST'])
@cross_origin(allow_headers=['Content-Type'])
def results():
    try:
        if request.method == 'GET':
            conn = mysql.connect()
            cur = conn.cursor()
            cur.callproc('sp_getResults')
            result = cur.fetchall()

            w_dict = []
            for wish in result:
                wi_dict = {
                    'id': wish[0],
                    'email': wish[1],
                    'name': wish[2],
                    'image': wish[3],
                    'time': wish[4]}
                w_dict.append(wi_dict)

            return jsonify(w_dict)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/reports', methods=['GET', 'POST'])
@cross_origin(allow_headers=['Content-Type'])
def getreports():
    try:
        if request.method == 'GET':
            conn = mysql.connect()
            cur = conn.cursor()
            cur.callproc('sp_getReports')
            result = cur.fetchall()

            info = []
            for wish in result:
                i_dict = {
                    'id': wish[0],
                    'title': wish[1],
                    'info': wish[2],
                    'mango': wish[3],
                    'new': wish[4]}
                info.append(i_dict)

            return jsonify(info)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/api/updates', methods=['GET', 'POST'])
@cross_origin(allow_headers=['Content-Type'])
def updates():
    try:
        if request.method == 'POST':
            name = request.get_json()['names']
            descr = request.get_json()['description']
            control = request.get_json()['contr']

            # connect to mysql
            conn = mysql.connect()
            cur = conn.cursor()
            cur.execute("insert into prevention(pest_name, description, prevent)values('" +  str(name) + "', '" + str(descr) + "', '" + str(control) + "')")
            conn.commit()

            return jsonify({'message': 'Update Successfull.'})

    except Exception as e:
        return jsonify({'error': str(e)})
    cur.close()
    conn.close()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin(allow_headers=['Content-Type'])
def catch_all(path):
    if app.debug:
        return requests.get('http://localhost:8080/{}'.format(path)).text
    return render_template("index.html")