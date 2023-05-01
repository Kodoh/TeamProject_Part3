document.getElementById('createChatForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const employees = document.getElementById('employees').selectedOptions;
  const participants = Array.from(employees).map(e => e.value).join(', ');

  const chatData = {
    Name: `Chat with ${participants}`,
  };

  // Call the appropriate API method based on the number of selected employees
  const apiEndpoint = employees.length === 1 ? '/private' : '/groups';
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatData)
    });

    const responseData = await response.json();
    console.log(responseData.message);

    // Refresh the chat list
    const chatGroups = await fetchChatGroups(userId);
    const privateMessages = await fetchPrivateMessages(userId);

    // Combine chat groups and private messages into a single array
    const combinedChats = [
      ...chatGroups.data.map((group) => ({ ...group, participants: group.participants, type: 'public' })),
      ...privateMessages.data.map((privateMessage) => ({ ...privateMessage, participants: privateMessage.participants, type: 'private' })),
    ];

    displayChats(combinedChats);
  } catch (error) {
    console.error('Error creating chat:', error);
  }
});

async function fetchChatGroups(userId) {
  try {
    const response = await fetch(`/membership/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat groups:', error);
  }
}

async function fetchPrivateMessages(userId) {
  try {
    const response = await fetch(`/privateMessages/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching private messages:', error);
  }
}

function displayChats(chats) {
  const publicChatList = document.getElementById('publicChatList');
  const privateChatList = document.getElementById('privateChatList');
  
  chats.forEach((chat) => {
    const newChat = document.createElement('li');
    newChat.textContent = `Chat with ${chat.participants}`;
    newChat.addEventListener('click', function () {
      window.location.href = `chat_instance.html?chatId=${chat.id}`;
    });

    if (chat.type === 'public') {
      publicChatList.appendChild(newChat);
    } else {
      privateChatList.appendChild(newChat);
    }
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  $('#employees').select2();

  const userId = sessionStorage.getItem('userId'); // Get the user ID from sessionStorage

  if (!userId) {
    // Redirect to login page if the user ID is not available
    window.location.href = "/loginPage.html";
    return;
  }

  const chatGroups = await fetchChatGroups(userId);
  const privateMessages = await fetchPrivateMessages(userId);

  // Combine chat groups and private messages into a single array
  const combinedChats = [
    ...chatGroups.data.map((group) => ({ ...group, participants: group.participants, type: 'public' })),
    ...privateMessages.data.map((privateMessage) => ({ ...privateMessage, participants: privateMessage.participants, type: 'private' })),
  ];

  displayChats(combinedChats);
});
