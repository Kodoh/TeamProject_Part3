import React, { useEffect, useState } from 'react';
import { HStack, Button, Container, FormControl, FormLabel, Heading, Stack, List, ListItem, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Select } from 'chakra-react-select'
import { useNavigate } from 'react-router-dom';
import './App.css'


function TextChat() {

    // States and API calls to update states on load

    const [employeeSelectOptions, setEmployees] = useState([{}]);
    const [groups, setGroups] = useState([{}]);
    const [selected, setSelected] = useState([{}]);

    async function fetchAllUsers() {
        try {
            const response = await fetch('/users'); // Use the full URL here
            const data = await response.json();
            const emps = [];
            data.data.forEach((item) => {
                if (parseInt(sessionStorage.getItem('userId')) !== item.idUser) {
                    emps.push({
                        value: item.idUser,
                        label: item.email,
                        name: item.Name
                    })
                }
            })
            setEmployees(emps);

        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function fetchGroups() {
        try {
            const groups = await fetch(`/users/${sessionStorage.getItem('userId')}/groups`);
            const groupsData = await groups.json();

            const privateChats = await fetch(`/users/${sessionStorage.getItem('userId')}/private`);
            const privateData = await privateChats.json();

            setGroups(groupsData.data.concat(privateData.data));
            console.log(groupsData.data.concat(privateData.data))
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    useEffect(() => {
        fetchAllUsers();
        fetchGroups();
    }, [])


    // Navigate functions

    let navigate = useNavigate();
    const redirectDataAnalytics = () => {
        return navigate("/data-analytics")
    }
    const redirectTextChat = () => {
        return navigate("/text-chat")
    }

    // Chat creation functions

    const handleChange = (selectedOptions) => {
        setSelected(selectedOptions);
    }

    async function createMembership(userId, groupId, loggedInUserId) {
        console.log(groupId)
        // Add the loggedInUserId to the membership
        const userIds = [loggedInUserId, ...userId];

        try {
            await Promise.all(userIds.map(async (id) => {
                const response = await fetch('/membership', {
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


    const createChat = async (e) => {
        e.preventDefault();
        const apiEndpoint = selected.length === 1 ? '/private' : '/groups';
        try {
            let name = '';
            selected.forEach(element => {
                name += `${element.name} `
            });
            console.log(selected)
            console.log(name)
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        Name: name,
                    }
                )
            })
            if (response.status === 200) {
                const responseData = await response.json();

                // Get the ID of the newly created chat to be passed to membership table
                const chatId = responseData.message;
                console.log('Chat ID1:', chatId);

                // Add each participant to the new group including the loggedInUserId
                let participantIds = []
                selected.forEach((item) => {
                    participantIds.push(item.value)
                })
                await createMembership(participantIds, chatId, parseInt(sessionStorage.getItem('userId')));

                // Refresh the chat list
                fetchAllUsers();
                fetchGroups();
            } else {
                console.error('Error creating chat:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating chat:', error)
        }
    }

    return (
        <div className="App">
            <header>
                <HStack justify="center">
                    <Button onClick={redirectDataAnalytics}>Data Analytics</Button>
                    <Button onClick={redirectTextChat}>Text Chat</Button>
                </HStack>
            </header>
            <Container className='inner progress'>
                <FormControl>
                    <Stack>
                        <FormLabel>
                            <Heading size="md">Select Employees</Heading>
                        </FormLabel>
                        <Select
                            closeMenuOnSelect={false}
                            selectedOptionColorScheme="purple"
                            isMulti
                            name="employee-select"
                            options={employeeSelectOptions}
                            onChange={handleChange}
                            placeholder='Select Employees to add' />
                    </Stack>
                </FormControl>
                <Button onClick={createChat}>Create Chat</Button>
            </Container>
            <Container className='inner progress'>
                <Heading size="md">Existing Chats</Heading>
                <List spacing={3}>
                    {groups.map((item) => (
                        <ListItem key={item} >
                            <LinkBox as='article' p='3' borderWidth='1px' rounded='md' _hover={{ color: "teal.500" }}>
                                <Heading size='md'>
                                    <LinkOverlay href={`text-chat/${item.idGroup}`}>
                                        {item.Name}
                                    </LinkOverlay>
                                </Heading>
                            </LinkBox>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div >
    );
}

export default TextChat;
