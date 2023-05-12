import React from 'react';
import { Container, Card, CardHeader, CardBody, Heading, Stack, Input, InputGroup, InputRightElement, Button, CardFooter } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';


function Login() {

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    let navigate = useNavigate();


    const submit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/users/login',
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
            alert("An error occurred. Please try again.");
        }
    }

    return (
        <Container>
            <Card align="center">
                <CardHeader>
                    <Heading>Login</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
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
                <CardFooter>
                    <Button colorScheme='blue' onClick={submit}>
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </Container>
    );
}

export default Login;
