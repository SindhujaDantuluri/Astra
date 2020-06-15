from datetime import datetime
from Astra import db

class User(db.Model):
    username = db.Column(db.String(80), primary_key=True, unique=True)
    password = db.Column(db.String(80))
    def __init__(self, username, password):
        self.username = username
        self.password = password
    def __repr__(self):
        return '<User %r>' % self.username

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.username)

class Tasks(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    x_start = db.Column(db.Float(precision='3,2'))
    y_start = db.Column(db.Float(precision='3,2'))
    x_end = db.Column(db.Float(precision='3,2'))
    y_end = db.Column(db.Float(precision='3,2'))

    def __init__(self, id, x_start,y_start,x_end,y_end):
        self.id=id
        self.x_start=x_start
        self.y_start=y_start
        self.x_end=x_end
        self.y_end=y_end


    def __repr__(self):
        return f"Tasks('{self.x_start}','{self.y_start}','{self.x_end}','{self.y_end}')"
#
# class Status(db.Model):
#
