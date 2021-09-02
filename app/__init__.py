from flask import Flask

app = Flask(__name__, instance_relative_config=True)

app.config.from_object('config')

from app import views, forms, models

from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)
csrf.init_app(app)
