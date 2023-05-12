import React from 'react'
import Groups from '../Components/Groups'
import { Outlet } from 'react-router-dom'

export default function TextLayout() {
    return (
        <>
            <Groups />
            <Outlet />
        </>
    )
}
