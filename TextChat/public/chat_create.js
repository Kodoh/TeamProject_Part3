document.getElementById('createChatForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const loggedInUserId = parseInt(sessionStorage.getItem('userId'));
  const employees = document.getElementById('employees').selectedOptions;
  const participantIds = Array.from(employees).map(e => e.value);
  const participantNames = Array.from(employees).map(e => e.textContent).join(', ');

  const chatData = {
    Name: `Chat with ${participantNames}`,
  };

  console.log('Chat name:', chatData.Name);

  // Call the appropriate API method based on the number of selected employees
  const apiEndpoint = employees.length === 1 ? 'http://localhost:8383/textChat/private' : 'http://localhost:8383/textChat/groups';
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chatData)
    });

    console.log('Response status:', response.status);

    // if response is successfull capture response data
    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData);

      // Get the ID of the newly created chat to be passed to membership table
      const chatId = responseData.message.newId;
      console.log('Chat ID1:', chatId);

      // Add each participant to the new group including the loggedInUserId
      await createMembership(participantIds, chatId, loggedInUserId);

      // Refresh the chat list
      const chatGroups = await fetchChatGroups(loggedInUserId);
      const privateMessages = await fetchPrivateMessages(loggedInUserId);
      const combinedChats = await asyncMap(chatGroups, privateMessages);
      displayChats(combinedChats);
    } else {
      console.error('Error creating chat:', response.statusText);
    }
  } catch (error) {
    console.error('Error creating chat:', error);
  }
});

async function createMembership(userId, groupId, loggedInUserId) {
  // Add the loggedInUserId to the membership
  const userIds = [loggedInUserId, ...userId];

  try {
    await Promise.all(userIds.map(async (id) => {
      const response = await fetch('http://localhost:8383/textChat/membership', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: parseInt(id), groupId: parseInt(groupId) })
      });

      if (!response.ok) {
        console.error('Error while creating membership:', await response.text());
      }
    }));
  } catch (error) {
    console.error('Error while creating membership:', error);
  }
}


async function fetchChatGroups(userId) {

  try {
    const response = await fetch(`http://localhost:8383/textChat/groups/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat groups:', error);
  }
}

async function fetchPrivateMessages(userId) {
  try {
    const response = await fetch(`http://localhost:8383/textChat/private/${userId}`);
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

async function fetchAllUsers() {
  try {
    const response = await fetch('http://localhost:8383/TextChat/users'); // Use the full URL here
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function displayChats(chats) {
  const publicChatList = document.getElementById('publicChatList');
  const privateChatList = document.getElementById('privateChatList');

  // Clear the existing chat lists
  publicChatList.innerHTML = '';
  privateChatList.innerHTML = '';

  chats.forEach((chat) => {
    const newChat = document.createElement('li');
    newChat.textContent = `Chat with`
    chat.participants.forEach((participant) => {
      newChat.textContent += ` ${participant.Name}`;
    });
    newChat.addEventListener('click', function () {
      window.location.href = `chat_instance.html?chatId=${chat.idGroup}`;
    });

    if (chat.Private == 0) {
      publicChatList.appendChild(newChat);
    } else {
      privateChatList.appendChild(newChat);
    }
  });
}

function filterLoggedInUser(loggedInUserId) {
  const employeesSelect = document.getElementById('employees');
  const options = Array.from(employeesSelect.options);

  options.forEach(option => {
    if (parseInt(option.value) === loggedInUserId) {
      employeesSelect.removeChild(option);
    }
  });
}

async function asyncMap(chatGroups,privateMessages) {
  const combinedChats = [
    ...chatGroups.data.map(async (group) => ({ ...group, participants: await fetchGroupMembers(group.idGroup)})),
    ...privateMessages.data.map(async (privateMessage) => ({ ...privateMessage, participants: await fetchGroupMembers(privateMessage.idGroup)})),
  ];
  const results = await Promise.all(combinedChats);
  return results;
}


document.addEventListener('DOMContentLoaded', async () => {
  const loggedInUserId = parseInt(sessionStorage.getItem('userId'));
  console.log(loggedInUserId)
  if (!loggedInUserId) {
    // Redirect to login page if the user ID is not available
    window.location.href = "/loginPage.html";
    return;
  }

  // Fetch all users
  const allUsers = await fetchAllUsers();
  console.log('Fetched users:', allUsers);

  // Populate the 'employees' select element with user names
  const employeesSelect = document.getElementById('employees');
  allUsers.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.idUser;
    option.textContent = user.Name;
    employeesSelect.appendChild(option);
  });

  // Pass loggedInUserId as an argument to the filterLoggedInUser() function
  filterLoggedInUser(loggedInUserId);

  // Replace 'userId' with 'loggedInUserId'
  const chatGroups = await fetchChatGroups(loggedInUserId);
  console.log('Fetched chat groups:', chatGroups);
  const privateMessages = await fetchPrivateMessages(loggedInUserId);
  console.log('Fetched private messages:', privateMessages);
  const combinedChats = await asyncMap(chatGroups, privateMessages);

  // Combine chat groups and private messages into a single array
  console.log(combinedChats);
  displayChats(combinedChats);
});
