import React, { useEffect, useLayoutEffect, useState } from 'react';
import { HStack, Button, Flex, Heading, Input, InputGroup, InputRightElement, useDisclosure, Stack, IconButton } from '@chakra-ui/react'
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { SettingsIcon } from '@chakra-ui/icons';
import { useLocation, useParams } from 'react-router-dom';

function ChatView() {
    const { id } = useParams();
    const location = useLocation();
    let lastSender = '';
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupInfo, setGroup] = useState([{}])
    const [messages, setMessages] = useState([{}])
    const [addSelectOptions, setAddEmployees] = useState([{}]);
    const [selectedAdd, setAddSelected] = useState([{}]);
    const [removeSelectOptions, setRemoveEmployees] = useState([{}])
    const [selectedRemove, setRemoveSelected] = useState([{}])

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].idUser === obj.idUser) {
                return true;
            }
        }
        return false;
    }

    async function fetchGroupInfo() {
        try {
            const groupInfo = await (await fetch(`/groups/${id}`)).json();
            setGroup(groupInfo.data)
        } catch (error) {
            console.error('Error fetching group info:', error)
        }
    }

    async function fetchAllUsers() {
        try {
            const allUsers = await (await fetch('/users')).json();
            const groupUsers = await (await fetch(`/groups/${id}/users`)).json();
            const emps = [];
            allUsers.data.forEach((item) => {
                if (!containsObject(item, groupUsers.data)) {
                    emps.push({
                        value: item.idUser,
                        label: item.email
                    })
                }
            })
            setAddEmployees(emps);

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function fetchMessages() {
        const response = await fetch(`/groups/${id}/messages`);
        const messages = await response.json();
        setMessages(messages.data)
    }

    async function fetchGroupUsers() {
        try {
            const response = await fetch(`/groups/${id}/users`);
            const data = await response.json();
            const emps = [];
            data.data.forEach((item) => {
                if (parseInt(sessionStorage.getItem('userId')) !== item.idUser) {
                    emps.push({
                        value: item.idUser,
                        label: item.email
                    })
                }
            })
            setRemoveEmployees(emps);

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }


    useLayoutEffect(() => {
        console.log("location", location)
        fetchGroupInfo();
        fetchGroupUsers();
        fetchAllUsers();
        fetchMessages();
    }, [location])

    const send = async (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            const userId = parseInt(sessionStorage.getItem('userId'));
            const messageText = document.getElementById('message').value;

            // Only send if message is not empty
            if (messageText.trim() !== '') {

                const messageData = {
                    Contents: messageText,
                    Group_idGroup: id,
                    Sender: userId,
                };


                await fetch('/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(messageData),
                });

                document.getElementById('message').value = '';
                document.getElementById('message').focus();
                fetchMessages();
            }
        }
    }

    const handleChange = (selectedOptions) => {
        setAddSelected(selectedOptions);
    }

    const addUser = async (e) => {
        e.preventDefault();
        let participantIds = []
        selectedAdd.forEach((item) => {
            participantIds.push(item.value)
        })
        try {
            await Promise.all(participantIds.map(async (newId) => {
                const response = await fetch('/membership', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: parseInt(newId), groupId: parseInt(id) })
                });

                if (!response.ok) {
                    console.error('Error while creating membership:', await response.text());
                }
            }));
        } catch (error) {
            console.error('Error while creating membership:', error);
        }
    }

    const deleteUser = async (e) => {
        e.preventDefault();
        let participantIds = []
        selectedRemove.forEach((item) => {
            participantIds.push(item.value)
        })
        try {
            await Promise.all(participantIds.map(async (newId) => {
                const response = await fetch('/membership', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: parseInt(newId), groupId: parseInt(id) })
                });

                if (!response.ok) {
                    console.error('Error while creating membership:', await response.text());
                }
            }));
        } catch (error) {
            console.error('Error while creating membership:', error);
        }
    }

    const leaveGroup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/membership', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: parseInt(sessionStorage.getItem('userId')), groupId: parseInt(id) })
            });

            if (!response.ok) {
                console.error('Error while creating membership:', await response.text());
            }

        } catch (error) {
            console.error('Error while creating membership:', error);
        }
    }


    return (
        <>
            <Drawer isOpen={isOpen} onClose={onClose} placement='right'>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>
                        <Heading>Settings</Heading>
                    </DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <Stack>

                            <InputGroup>
                                <Input type='text' id='nameInput' value={groupInfo[0].Name} />
                                <InputRightElement width='4.5rem'>
                                    <Button onClick={send}>
                                        Rename
                                    </Button>
                                </InputRightElement>
                            </InputGroup>

                            <Select
                                closeMenuOnSelect={false}
                                selectedOptionColorScheme="purple"
                                isMulti
                                name="employee-select"
                                options={addSelectOptions}
                                onChange={handleChange}
                                placeholder='Select Employees to add' />
                            <Button onClick={addUser}>
                                Add user
                            </Button>
                            <Select
                                closeMenuOnSelect={false}
                                selectedOptionColorScheme="purple"
                                isMulti
                                name="employee-select"
                                options={removeSelectOptions}
                                onChange={handleChange}
                                placeholder='Select Employees to remove' />
                            <Button onClick={deleteUser}>
                                Remove user
                            </Button>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <HStack>
                            <Button colorScheme='red' onClick={leaveGroup}>
                                Leave Group
                            </Button>
                        </HStack>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <Flex flexDir='column' flexGrow='1' position='relative'>
                <Flex p='0.5em' justify='center' bg='teal.400'>
                    <Heading>{groupInfo[0].Name}</Heading>
                    <IconButton size='lg' ml='auto' mr='0' bg='teal.400' aria-label='Data Analytics' icon={<SettingsIcon />} onClick={onOpen} _hover={{ color: "white" }} _active={{ color: "white" }} />
                </Flex>
                <div id='chatMessages' className='messages'>
                    {messages.map((message) => {
                        const userId = parseInt(sessionStorage.getItem('userId'));
                        const isCurrentUser = message.Sender === userId;
                        if (lastSender !== message.Sender) {
                            lastSender = message.Sender;
                            return (
                                <div key={message.idMessages} className='message-wrapper'>
                                    <div className={isCurrentUser ? 'username user-username' : 'username'}>
                                        {message.Name}
                                    </div>
                                    <div className={isCurrentUser ? 'message user-message' : 'message'}>
                                        {message.Contents}
                                    </div>
                                </div>
                            )
                        } else {
                            lastSender = message.Sender;
                            return (
                                <div key={message.idMessages} className='message-wrapper'>
                                    <div className={isCurrentUser ? 'message user-message' : 'message'}>
                                        {message.Contents}
                                    </div>
                                </div>
                            )
                        }

                    })}
                </div>
                <InputGroup
                    w='100%'
                    pb='1em'
                    px='1em'>
                    <Input
                        pr='4.5rem'
                        type='text'
                        placeholder='Type your message'
                        id='message'
                        onKeyDown={send} />
                </InputGroup>
            </Flex>
        </>
    )
}

export default ChatView;
