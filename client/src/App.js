import React from 'react';
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Analytics from './pages/Analytics'

import { ChakraProvider } from '@chakra-ui/react';
import RootLayout from './layouts/RootLayout'
import TextLayout from './layouts/TextLayout';
import ChatView from './Components/ChatView';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Login />} />
            <Route element={<RootLayout />}>
                <Route path="/data-analytics" element={<Analytics />} />
                <Route path="/text-chat/" element={<TextLayout />} >
                    <Route path=":id" element={<ChatView />} key={document.location.href} />
                </Route>
            </Route>
        </>
    )
)

function App() {

    return (
        <ChakraProvider>
            <RouterProvider router={router} />
        </ChakraProvider>
    );
}

export default App;
