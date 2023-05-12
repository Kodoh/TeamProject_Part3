import React from 'react';
import './ChatWindow.css'
import ChatView from '../Components/ChatView'
import Nav from '../Components/Nav'
import Groups from '../Components/Groups';

function ChatWindow() {
    return (
        <div className='wrapper'>
            <Nav />
            <Groups />
            <ChatView />
        </div>
    );
}

export default ChatWindow;
