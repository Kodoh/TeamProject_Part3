import React, { useEffect, useState } from "react";
import { Flex, IconButton, useDisclosure, Button, Input, Stack, Text } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import { AtSignIcon, CalendarIcon, ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


function Nav() {
    // Navigation onClick functions
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user, setUser] = useState([{}])

    async function fetchUser() {
        try {
            const response = await (await fetch(`/users/${sessionStorage.getItem('userId')}`)).json()
            setUser(response.data)
        } catch (error) {
            console.error('There was an error fetching your information', error)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    let navigate = useNavigate();

    const redirectDataAnalytics = () => {
        return navigate("/data-analytics")
    }

    const redirectTextChat = () => {
        return navigate("/text-chat")
    }

    const submit = async () => {
        const name = document.getElementById('name').value
        const email = document.getElementById('email').value

        try {
            await fetch(`/users/${sessionStorage.getItem('userId')}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email
                })
            })
        } catch (error) {
            console.error('There was an error updating your details:', error)
        }
    }


    return (
        <Flex flexDir={'column'} bg='#262626' justify='center' gap='10px' px='0.5em'>
            <IconButton color='whiteAlpha.700' bg='#3C3C3D' aria-label='Data Analytics' icon={<CalendarIcon />} onClick={redirectDataAnalytics} _hover={{ color: 'white', backgroundColor: '#F4442E' }} />
            <IconButton color='whiteAlpha.700' bg='#3C3C3D' aria-label='Text Chat' icon={<ChatIcon />} onClick={redirectTextChat} _hover={{ color: 'white', backgroundColor: '#F4442E' }} />
            <IconButton color='whiteAlpha.700' bg='#3C3C3D' aria-label='Text Chat' icon={<AtSignIcon />} onClick={onOpen} _hover={{ color: 'white', backgroundColor: '#F4442E' }} />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Edit your account</DrawerHeader>

                    <DrawerBody>
                        <Stack>
                            <Text>Name:</Text>
                            <Input id='name' defaultValue={user[0].Name} />
                            <Text>Email:</Text>
                            <Input id='email' defaultValue={user[0].email} />
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button bg='#F4442E' color='white' _hover={{ color: 'white' }} onClick={submit}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
}

export default Nav;