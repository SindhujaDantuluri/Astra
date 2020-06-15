Project Astra

How to Use the Project data.
-----------------------------------------
First Step:
Install the virtual environment
$sudo pip install virtualenv

$virtualenv -p python3 venv
(you can replace venv with any name)

    Activate virtual environment:
$source venv/bin/activate

    To deactivate:
$deactivate

-----------------------------------------
Second Step:
After entering into virtual environment, Install the following requirements
$pip install flask
$pip install flask_sqlalchemy
$pip install flask_bootstrap
$pip install flask-opencv-streamer

-----------------------------------------
Third Step:
Now set the login username and password in the database(everything inside virtual environment)
$python
Inside the python shell:
$from Astra import db

$from Astra.models import User

$user=User('username','password')
('username' & 'password' can be any of your choice)
$db.session.add(user)
$db.session.commit()
$exit()

-----------------------------------------
Fourth Step:
Now run the server, open the project folder(interface)
$python app.py

copy the url address in the console and open it in the browser.
