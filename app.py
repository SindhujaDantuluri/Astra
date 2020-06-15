from Astra import app
from Astra.views import init_db


if __name__ == '__main__':
    app,init_db()
    app.debug = True
    app.run(host='0.0.0.0', port = 8000)
