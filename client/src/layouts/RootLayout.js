import React from 'react'
import Nav from '../Components/Nav'
import { Outlet } from 'react-router-dom'
import '../pages/ChatWindow.css'

export default function RootLayout() {
    return (
        <div className='wrapper'>
            <Nav />
            <Outlet />
        </div>
    )
}
