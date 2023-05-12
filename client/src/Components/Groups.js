import React, { useEffect, useState } from "react";
import { Flex, List, Divider } from "@chakra-ui/react"
import { Link } from "react-router-dom";

function Groups() {
    const [groups, setGroups] = useState([{}])


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
    }, [])


    return (
        <Flex flexDir='column' bg='teal.500' flexGrow='0.1'>
            <List>
                {groups.map((item) => {
                    const link = `${item.idGroup}`
                    return (
                        <>
                            <Link to={link}>
                                {item.Name}
                            </Link>
                            <Divider />
                        </>
                    )
                })}
            </List>
        </Flex>
    )
}

export default Groups;