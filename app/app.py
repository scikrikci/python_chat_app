from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('chat_app.html')

# ------------------------------
@socketio.on('connect')
def test_connect():
    print("Client connected")

# ------------------------------
@socketio.on('chat')
def handle_message(message):
    socketio.emit('chat', message)

# ------------------------------
@socketio.on('typing')
def handle_typing(data):
    socketio.emit('typing', data, broadcast=True)

# ------------------------------
@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected')



if __name__ == '__main__':
    socketio.run(app, debug=False, port=8000)