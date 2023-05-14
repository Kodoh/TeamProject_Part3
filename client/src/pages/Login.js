import React, { useState } from 'react';
import { Link, HStack, Flex, Card, CardHeader, CardBody, Heading, Stack, Input, InputGroup, InputRightElement, Button, CardFooter } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function Login() {

    const [show, setShow] = useState(false);
    const [signup, setSignup] = useState(false);
    const handleClick = () => setShow(!show)
    let navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        if (signup) {
            try {
                const res = await fetch('/textChat/users',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            name: document.getElementById('name').value,
                            email: document.getElementById("email").value,
                            Password: document.getElementById("password").value
                        }),
                        headers: { "Content-Type": "application/json" }
                    })
                const data = await res.json()
                if (data.message) {
                    sessionStorage.setItem('userId', data.data); // Store the user ID in sessionStorage
                    return navigate('/text-chat');
                } else {
                    alert("Error");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred whilst signing in. Please try again.");
            }
        } else {
            try {
                const res = await fetch('/textChat/users/login',
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            email: document.getElementById("email").value,
                            Password: document.getElementById("password").value
                        }),
                        headers: { "Content-Type": "application/json" }
                    })
                const data = await res.json()
                if (data.data[0]) {
                    sessionStorage.setItem('userId', data.data[0].idUser); // Store the user ID in sessionStorage
                    return navigate('/text-chat');
                } else {
                    alert("Incorrect email or password");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred whilst signing in. Please try again.");
            }
        }

    }

    return (
        <Flex bg='#3C3C3D' h='100vh' justify='center' align='center'>
            <Card align="center" boxShadow='dark-lg' py='1em' px='2em'>
                <CardHeader>
                    <Heading>Make It All</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                        {signup ?
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    pr='4.5rem'
                                    type='text'
                                    placeholder='Enter name'
                                    id='name'
                                />
                            </FormControl>
                            :
                            <></>}
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input pr='4.5rem'
                                type='email'
                                placeholder='Enter email'
                                id='email' />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup size='md'>
                                <Input
                                    pr='4.5rem'
                                    type={show ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    id='password'
                                />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                    </Stack>
                </CardBody>
                <CardFooter w='100%'>
                    <Flex flexBasis='100%' justify='space-around' align='center'>
                        {signup ?
                            <>
                                <Button variant='ghost' onClick={() => { setSignup(false) }}>Log in</Button>
                                <Button bg='#F4442E' color='white' onClick={submit} _hover={{ color: 'white' }}>
                                    Sign up
                                </Button>
                            </>
                            :
                            <>
                                <Button variant='ghost' onClick={() => { setSignup(true) }}>Sign up</Button>
                                <Button bg='#F4442E' color='white' onClick={submit} _hover={{ color: 'white' }}>
                                    Login
                                </Button>
                            </>
                        }
                    </Flex>
                </CardFooter>
            </Card>
        </Flex>
    );
}

export default Login;
