const loggedInUserId = parseInt(sessionStorage.getItem('userId'));
let lastSender = '';

async function updateGroupName(groupId, newName, isPrivate) {
  try {
    await fetch(`http://localhost:8383/textChat/groups/${groupId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Name: newName,
      }),
    });
    return true;
  } catch (error) {
    console.error('Error while updating group name:', error);
    return false;
  }
}

async function fetchMessages(groupId) {
  const response = await fetch(`http://localhost:8383/textChat/groups/message/${groupId}`);
  const messages = await response.json();
  return messages.data;
}

async function fetchAllGroups() {
  const response = await fetch('http://localhost:8383/textChat/groups');
  const groups = await response.json();
  return groups.data;
}

async function getGroupPrivacySetting() {
  const allGroups = await fetchAllGroups();
  const currentGroupId = getGroupIdFromUrl();
  const currentGroup = allGroups.find(group => group.idGroup == currentGroupId);

  if (currentGroup) {
    const isPrivate = currentGroup.Private;

    // Return the privacy setting of the current group
    return isPrivate;
  } else {
    throw new Error('Group not found');
  }
}

(async () => {
  try {
    const privacySetting = await getGroupPrivacySetting();
    console.log('Privacy setting:', privacySetting);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();

function getGroupIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('chatId');
}

async function fetchUserById(userId) {
  const response = await fetch(`http://localhost:8383/textChat/users/${userId}`);
  const userResponse = await response.json();
  const user = userResponse.data[0]; // The name associated with the user ID
  return user;
}

async function renderMessages(messages) {
  const chatMessages = document.getElementById('chatMessages');
  for (const message of messages) {
    const user = await fetchUserById(message.Sender);
    const username = user.Name;
    const isCurrentUser = message.Sender == loggedInUserId;

    const newMessageWrapper = document.createElement('div');
    newMessageWrapper.className = 'message-wrapper';

    if (lastSender !== username) {
      const usernameElement = document.createElement('div');
      usernameElement.className = isCurrentUser ? 'username user-username' : 'username';
      usernameElement.textContent = username;

      newMessageWrapper.appendChild(usernameElement);
    }

    const newMessage = document.createElement('div');
    newMessage.className = isCurrentUser ? 'message user-message' : 'message';
    newMessage.textContent = message.Contents;

    newMessageWrapper.appendChild(newMessage);
    chatMessages.appendChild(newMessageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    lastSender = username;
  }
}

document.getElementById('sendMessageForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const messageText = document.getElementById('messageText').value;
  const user = await fetchUserById(loggedInUserId);
  const username = user.Name;

  if (messageText.trim() !== '') {
    const chatMessages = document.getElementById('chatMessages');
    const newMessageWrapper = document.createElement('div');
    newMessageWrapper.className = 'message-wrapper';
  
    if (lastSender !== username) {
      const usernameElement = document.createElement('div');
      usernameElement.className = loggedInUserId === user.idUser ? 'username user-username' : 'username';
      usernameElement.textContent = username;
  
      newMessageWrapper.appendChild(usernameElement);
    }
  
    const newMessage = document.createElement('div');
    newMessage.className = loggedInUserId === user.idUser ? 'message user-message' : 'message';
    newMessage.textContent = messageText;
  
    newMessageWrapper.appendChild(newMessage);
    chatMessages.appendChild(newMessageWrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    document.getElementById('messageText').value = '';
  
    lastSender = username;

    const groupId = getGroupIdFromUrl();
    const messageData = {
      Contents: messageText,
      Group_idGroup: groupId,
      Sender: loggedInUserId,
    };

    await fetch('http://localhost:8383/textChat/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messageData),
    });
  }
});

// event listeners for opening and closing settings button
document.addEventListener('DOMContentLoaded', async () => {
  const currentGroupId = getGroupIdFromUrl();
  const messages = await fetchMessages(currentGroupId);
  renderMessages(messages);

  document.getElementById('settingsButton').addEventListener('click', function () { 
    document.querySelector('.settings-overlay').classList.remove('hidden');
    const updateChatNameButton = document.getElementById('updateChatName');
    const chatNameInput = document.getElementById('chatName');
    const chatTitle = document.querySelector('header h1');
  
    updateChatNameButton.addEventListener('click', async () => {
      const newChatName = chatNameInput.value.trim();
      if (newChatName) {
        const groupId = getGroupIdFromUrl();
        const isPrivate = await getGroupPrivacySetting(); // Get the privacy setting of the group
        const result = await updateGroupName(groupId, newChatName);
        if (result) {
          chatTitle.textContent = newChatName;
        } else {
          console.error('Failed to update the group name');
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
});