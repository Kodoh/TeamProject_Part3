import React from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


function Nav() {
    // Navigation onClick functions

    let navigate = useNavigate();

    const redirectDataAnalytics = () => {
        return navigate("/data-analytics")
    }

    const redirectTextChat = () => {
        return navigate("/text-chat")
    }

    return (
        <Flex flexDir={'column'} bg='teal.600' justify='center' gap='10px' px='0.5em'>
            <IconButton bg='teal.500' aria-label='Data Analytics' icon={<CalendarIcon />} onClick={redirectDataAnalytics} />
            <IconButton bg='teal.500' aria-label='Text Chat' icon={<ChatIcon />} onClick={redirectTextChat} />
        </Flex>
    )
}

export default Nav;