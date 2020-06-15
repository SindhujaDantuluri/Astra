from Astra.models import User, Tasks
from Astra import db

# import serial
#
# ser = serial.Serial('/dev/ttyACM0')
#
# read_values=0


class Commands:
    def parse(cmd):
        scopes = list(cmd.split('.'))
        print(scopes)       
    def hello(temp):
        return ('Hello world')
    def speedinc(temp):
        return ('speed increased by ',temp)
    def speeddec(temp):
        return ('speed decreased by ',temp)
    def tasks(temp):
        task = Tasks(23,3.2,3.2,3.2,3.2)
        db.session.add(task)
        db.session.commit()
        return ('succesful')
    # def serial(temp):
    #     readline=ser.readline()
    #     return(readline)


