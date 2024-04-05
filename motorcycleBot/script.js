const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function getCurrentTime() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${day} ${hours}:${minutes}`;
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message !== '') {
        appendMessage('user', message);
        fetchResponseFromChatGPT(message);
        userInput.value = '';
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    const timeStamp = getCurrentTime();
    messageElement.classList.add('message', sender);
    messageElement.innerHTML = `
        <span class="message-text">${message}</span>
        <span class="message-time">${timeStamp}</span>`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function fetchResponseFromChatGPT(message) {
    fetch('/chatgpt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        appendMessage('chatgpt', data.response);
    })
    .catch(error => console.error('Error:', error));
}