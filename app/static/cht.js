const socket = io.connect('http://127.0.0.1:8000/');

const sender = document.getElementById('sender');
const message = document.getElementById('message');
const submit = document.getElementById('submit');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// ------------------
submit.addEventListener('click', function() {
    socket.emit('chat', {
        sender: sender.value,
        message: message.value
    });
    message.value = '';
    feedback.innerHTML = '';
});

socket.on('chat', message => {
    output.innerHTML += `<p><strong>${message.sender}</strong>: ${message.message}</p>`;
    feedback.innerHTML = '';
});



// ------------------
message.addEventListener('keypress', () => {
    socket.emit('typing', sender.value);
});

socket.on('typing', data => {
    feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
});