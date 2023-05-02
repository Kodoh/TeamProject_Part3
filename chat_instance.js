function getRandomUser() {  // function for my own front-end testing purposes only to mimic multiple different people chatting
  const users = ['John Boggins', 'Alice Simmons', 'Bob Builder'];
  return users[Math.floor(Math.random() * users.length)];
}

let lastSender = '';

    document.getElementById('sendMessageForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const messageText = document.getElementById('messageText').value;
    const username = getRandomUser(); // will need to modify to get actual usernames

    if (messageText.trim() !== '') { // checks to ensure message is not an empty string
        const chatMessages = document.getElementById('chatMessages');
        const newMessageWrapper = document.createElement('div'); // creates a new message on the screen
        newMessageWrapper.className = 'message-wrapper';

        if (lastSender !== username) { // if same user sends multiple messages page adds message under previous without re-adding their name. This messagw will add the name of the user adding a message
        const usernameElement = document.createElement('div');
        usernameElement.className = username === 'John Boggins' ? 'username user-username' : 'username';
        usernameElement.textContent = username;

        newMessageWrapper.appendChild(usernameElement); 
        }

        const newMessage = document.createElement('div');
        newMessage.className = username === 'John Boggins' ? 'message user-message' : 'message';
        newMessage.textContent = messageText;

        newMessageWrapper.appendChild(newMessage);
        chatMessages.appendChild(newMessageWrapper);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        document.getElementById('messageText').value = '';

        lastSender = username;
    }
    });
    // event listeners for opening and closing settings button
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('sendMessageForm').addEventListener('submit', function (e) {
        });
      
        document.getElementById('settingsButton').addEventListener('click', function () { 
          document.querySelector('.settings-overlay').classList.remove('hidden');
          const updateChatNameButton = document.getElementById('updateChatName');
          const chatNameInput = document.getElementById('chatName');
          const chatTitle = document.querySelector('header h1');
        
          updateChatNameButton.addEventListener('click', async () => {
            const newChatName = chatNameInput.value.trim();
            if (newChatName) {
              chatTitle.textContent = newChatName;
              
              // Get the chatId from the URL
              const urlParams = new URLSearchParams(window.location.search);
              const chatId = urlParams.get('chatId');
          
              // Update the group name in the database
              try {
                const response = await fetch(`/groups/${chatId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ name: newChatName }),
                });
          
                const responseData = await response.json();
                console.log(responseData.message);
              } catch (error) {
                console.error('Error updating group name:', error);
              }
            }
          });
        });
      
        document.getElementById('closeSettings').addEventListener('click', function () {
          document.querySelector('.settings-overlay').classList.add('hidden');
        });

        document.getElementById('backButton').addEventListener('click', function () {
            window.location.href = 'Chat_creation.html';
        });    

        document.getElementById('leaveChat').addEventListener('click', async () => { // removes user membership from specific group
          const userId = sessionStorage.getItem('userId');
          const urlParams = new URLSearchParams(window.location.search);
          const chatId = urlParams.get('chatId');
      
          try {
            const response = await fetch('/membership', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: userId, groupId: chatId }),
            });
      
            const responseData = await response.json();
            console.log(responseData.message);
      
            window.location.href = 'Chat_creation.html';
          } catch (error) {
            console.error('Error while deleting membership:', error);
          }
        });

      }); 