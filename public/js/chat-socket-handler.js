const chatListContainer = document.querySelector('.chat-container');
const chatList = document.querySelector('.chat');
const sendMessage = document.getElementById('sendMessage');
const sendButton = document.getElementById('sendButton');

const socket = io();

sendButton.addEventListener('click', (e) => {
  if (sendMessage.value.length < 1) {
    return;
  }

  const time = new Date();
  const data = {
    username: localStorage.getItem('user'),
    message: sendMessage.value,
    date: `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`,
  };

  socket.emit('message:send', data);
  sendMessage.value = '';
  sendMessage.focus();
  chatListContainer.scrollTop = chatListContainer.scrollHeight + 100;
});

socket.on('message:send', (data) => {
  chatList.innerHTML += `<p class="message">
        <span><strong>${data.username}:</strong></span>
        <span>${data.message}</span>
        <span style="float: right; padding-right: 100px;">${data.date}</span>
      </p>`;
});
