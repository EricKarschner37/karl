import os

DEBUG = True
SECRET_KEY = os.environ.get("KARL_SECRET_KEY")
MONGO_USERNAME = os.environ.get("KARL_MONGO_USER")
MONGO_PASSWORD = os.environ.get("KARL_MONGO_PWD")
MONGO_URI = os.environ.get("KARL_MONGO_URI")
