import datetime


class Order():
    def __dict__(self):
        return {
            'temperature': self.temperature,
            'flavors': self.flavors,
            'milk': self.milk,
            'is_complete': self.is_complete,
            'ts': datetime.datetime.utcnow(),
        }
