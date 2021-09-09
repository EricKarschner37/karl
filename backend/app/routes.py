from flask import redirect, render_template, request
from app import app, models
from pymongo import MongoClient
from flask_cors import cross_origin
from bson import json_util, ObjectId
import json

client = MongoClient(app.config["MONGO_URI"], tls=True, username=app.config["MONGO_USERNAME"], password=app.config["MONGO_PASSWORD"])
mongo = client.karl

def encoder(o):
    if type(o) == ObjectId:
        return str(o)
    return o.__str__

@app.route("/order", methods=['POST', 'DELETE'])
@cross_origin(origins=["https://karl-karl.apps.okd4.csh.rit.edu/*"])
def order():
    if request.method == 'DELETE':
        result = mongo.orders.delete_one({'_id': ObjectId(request.json['id'])})
        return {'id': request.json['id']}, 200
    order = models.Order()

    print(request.json)
    order.temperature = request.json['temperature']
    order.flavors = request.json['flavors']
    order.milk = request.json['milk']

    order.is_complete = False
    result = mongo.orders.insert_one(order.__dict__())
    if result.inserted_id:
        return {'id': str(result.inserted_id)}, 200
    return {'error': 'Something went wrong. Please try again later'}, 500

@app.route("/orders", methods=['GET'])
@cross_origin(origins=["https://karl-karl.apps.okd4.csh.rit.edu/*"])
def orders():
    orders = list(mongo.orders.find().sort('ts'))
    return {'orders': json.loads(json_util.dumps(orders))}, 200
