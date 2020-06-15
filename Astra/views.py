
from Astra import app
from flask import render_template, url_for,flash, redirect, request, session, abort, Response, jsonify
from Astra import camera
from Astra.models import User, Tasks
from Astra import db
from Astra.commandline import Commands
import gevent
import numpy as np

#This is route to the home page.
@app.route('/')
def home():
    if session['logged_in'] :
        return render_template('coder.html')
    else:
        return render_template('login.html')

#the fuction activates the models.
def init_db():
    db.init_app(app)
    db.app = app
    db.create_all()



#login function
@app.route('/login', methods=['POST'])
def do_admin_login():
    user = User.query.filter_by(username=request.form['username'], password=request.form['password']).first()
    if user:
        session['logged_in'] = True

    else:
        flash('wrong password!')
    return home()

#logout function
@app.route("/logout")
def logout():
    session['logged_in'] = False

    return home()



#camera function taking each frame and giving it in jpeg images as video.
def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

#giving the video feed through '/video_feed' url
@app.route('/video_feed')
def video_feed():
    sno=0
    return Response(gen(camera.Camera(sno)),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


#commandline router, through which all the commands are accessed.
#getattr() funtion is used to parse the given string and store it in a variable, to run it as a function.
@app.route('/commandline', methods=['POST','GET'])
def commandline():
    command=request.json['data'].split('.')
    function=getattr(Commands, command[0])
    result=function(command[1])
    if session['logged_in']:
        return jsonify({'res': result})
    return "Null"





# This is route to the point.



@app.route("/stream")
def stream():
    def eventStream():
        while True:
            data = np.random.rand(10000, 6)
            data[:,3:] = data[:, :3].copy()
            data[:, :3] = (data[:, :3] * 40) - 20
            # data[:,3:] *= 255
            gevent.sleep(0.001)
            yield "data:  {}\n\n".format(data.tolist())

    return Response(eventStream(), mimetype="text/event-stream")




