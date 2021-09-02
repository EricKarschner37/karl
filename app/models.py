import datetime


class Order():
    def __dict__(self):
        return {
            'temp': self.temp,
            'flavors': self.flavors,
            'milk': self.milk,
            'is_complete': self.is_complete,
            'ts': datetime.datetime.utcnow(),
        }
