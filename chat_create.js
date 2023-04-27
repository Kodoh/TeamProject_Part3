document.getElementById('createChatForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const employees = document.getElementById('employees').selectedOptions;
    const participants = Array.from(employees).map(e => e.value).join(', ');
    const chatList = document.getElementById('chatList');
  
    const newChat = document.createElement('li');
    newChat.textContent = `Chat with ${participants}`;
    newChat.addEventListener('click', function () {
      // Redirect to the chat instance page with a unique ID
      window.location.href = `chat_instance.html?chatId=${Date.now()}`;
    });
  
    chatList.appendChild(newChat);
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    $('#employees').select2();
  });