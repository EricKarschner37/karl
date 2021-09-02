from flask import redirect, render_template, request
from app import app, forms, models
from flask_pymongo import PyMongo, ObjectId

mongo = PyMongo(app, username=app.config["MONGO_USERNAME"], password=app.config["MONGO_PASSWORD"], tls=True)

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')

@app.route("/order", methods=['GET', 'POST'])
def order():
    form = forms.OrderForm()
    order = models.Order()

    print(request.form)
    if form.validate():
        form.populate_obj(order)
        order.is_complete = False
        mongo.db.orders.insert_one(order.__dict__())
        return redirect('/success')

    return render_template('order.html', form=form)

@app.route("/orders", methods=['GET', 'POST'])
def orders():
    if request.method == 'POST':
        print(request.form)
        order = mongo.db.orders.find_one(ObjectId(request.form['id']))
        mongo.db.orders.delete_one({'_id': ObjectId(request.form['id'])})
        return redirect('/orders')
    orders = mongo.db.orders.find().sort('ts')
    return render_template('orders.html', orders=orders)

@app.route("/success", methods=['GET'])
def success():
    return render_template('success.html')
