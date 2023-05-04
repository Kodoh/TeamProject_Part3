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
    const response = await fetch(`http://localhost:8383/textChat/membership/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat groups:', error);
  }
}

async function fetchPrivateMessages(userId) {
  try {
    const response = await fetch(`http://localhost:8383/textChat/PrivateMessages/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching private messages:', error);
  }
}


async function fetchGroupMembers(groupId) {
  try {
    console.log("hello")
    const response = await fetch(`http://localhost:8383/textChat/groups/users/${groupId}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching private messages:', error);
  }
}



function displayChats(chats) {
  const publicChatList = document.getElementById('publicChatList');
  const privateChatList = document.getElementById('privateChatList');

  // Clear the existing chat lists
  publicChatList.innerHTML = '';
  privateChatList.innerHTML = '';

  chats.forEach((chat) => {
    console.log(chat.participants)
    const newChat = document.createElement('li');
    newChat.textContent = `Chat with`
    chat.participants.forEach((participant) => {
      newChat.textContent += ` ${participant.Name}`;
    });
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


async function asyncMap(chatGroups,privateMessages) {
  const combinedChats = [
    ...chatGroups.data.map(async (group) => ({ ...group, participants: await fetchGroupMembers(group.Group_idGroup), type: 'public' })),
    ...privateMessages.data.map(async (privateMessage) => ({ ...privateMessage, participants: await fetchGroupMembers(privateMessage.Group_idGroup), type: 'private' })),
  ];
  const results = await Promise.all(combinedChats);
  return results;
}


document.addEventListener('DOMContentLoaded', async () => {

  const userId = sessionStorage.getItem('userId'); // Get the user ID from sessionStorage
  console.log(userId)
  if (!userId) {
    // Redirect to login page if the user ID is not available
    window.location.href = "/loginPage.html";
    return;
  }

  const chatGroups = await fetchChatGroups(userId);
  const privateMessages = await fetchPrivateMessages(userId);
  console.log(chatGroups)
  const combinedChats = await asyncMap(chatGroups,privateMessages)
  // Combine chat groups and private messages into a single array
  console.log(combinedChats)
  displayChats(combinedChats);
});