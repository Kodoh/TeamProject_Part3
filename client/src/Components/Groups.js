import React, { useEffect, useState } from "react";
import { Flex, List, LinkBox, Heading, IconButton, useDisclosure, Button, Stack, Input } from "@chakra-ui/react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";

function Groups() {
    const [groups, setGroups] = useState([{}])
    const [updatedGroups, setUpdatedGroups] = useState()
    let navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()


    async function fetchGroups() {
        try {
            const groups = await fetch(`/users/${sessionStorage.getItem('userId')}/groups`);
            const groupsData = await groups.json();

            const privateChats = await fetch(`/users/${sessionStorage.getItem('userId')}/private`);
            const privateData = await privateChats.json();

            setGroups(groupsData.data.concat(privateData.data));
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    useEffect(() => {
        fetchGroups();
    }, [updatedGroups])

    const createGroup = async () => {
        const groupData = {
            Name: document.getElementById('groupInput').value
        }

        try {
            const response = await fetch(`/groups`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupData)
            })
            if (response.status === 200) {
                const responseData = await response.json();
                const chatId = responseData.message;
                const response2 = await fetch('/membership', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: parseInt(sessionStorage.getItem('userId')), groupId: parseInt(chatId) })
                });

                if (!response2.ok) {
                    console.error('Error while creating membership:', await response.text());
                }
                setUpdatedGroups(!updatedGroups)
            }
        } catch (error) {
            console.error('There was an error creating a new chat:', error)
        }
    }

    const deleteGroup = async (id) => {
        try {
            await fetch(`/groups/${id}`, {
                method: 'DELETE'
            });

            setUpdatedGroups(!updatedGroups);
            return navigate('');
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    }

    return (
        <Flex position='relative' flexDir='column' bg='#3C3C3D' flexBasis='400px'>
            <List>
                {groups.map((item) => {
                    const link = `${item.idGroup}`
                    return (
                        <Flex key={item.idGroup} align='center' justify='space-between'>
                            <LinkBox as='article' p='5' >
                                <Heading size='md' my='2' color='whiteAlpha.900'>
                                    <Link to={link}>
                                        {item.Name}
                                    </Link>
                                </Heading>
                            </LinkBox>
                            <IconButton mr='0.5em' color='whiteAlpha.700' bg='' aria-label='Delete Group' icon={<CloseIcon />} onClick={() => deleteGroup(item.idGroup)} _hover={{ color: 'white', backgroundColor: '' }} />
                        </Flex>
                    )
                })}
            </List>
            <IconButton size='lg' color='white' bg='#F4442E' position='absolute' bottom='1em' right='1em' onClick={onOpen} isRound='true' icon={<AddIcon />} aria-label="Create new chat" _hover={{ color: 'black', backgroundColor: 'white' }} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create New Chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input id='groupInput' type='text' placeholder="Name of chat" />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={() => { onClose(); createGroup() }}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}

export default Groups;