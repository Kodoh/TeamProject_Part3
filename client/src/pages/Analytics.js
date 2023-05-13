import '../App.css';
import { Progress, Heading, CircularProgress, CircularProgressLabel, Button, HStack, useStatStyles } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../Components/DataTable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("avatar", {
        cell: (info) => info.getValue(),
        header: ""
    }),
    columnHelper.accessor("Name", {
        cell: (info) => info.getValue(),
        header: "Name",
        sortType: "basic",
    }),
    columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Email",
        sortType: "basic",
    }),
    columnHelper.accessor("joindate", {
        cell: (info) => info.getValue(),
        header: "Member since",
        sortType: "basic"
    }),
    columnHelper.accessor("role", {
        cell: (info) => info.getValue(),
        header: "Role",
        sortType: "basic",
    })
];


function App() {
    let navigate = useNavigate();
    const [users, setUsers] = useState([{}])

    async function fetchUsers() {
        try {
            const response = await (await fetch('/users')).json()
            setUsers(response.data)
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="App">
            <div className="outer progress">
                <Heading size="lg">Projects</Heading>
                <div className="inner progress">
                    <div className='temp'>
                        <Heading size="md">Project 1</Heading>
                        <Progress colorScheme="red" hasStripe value={80}></Progress>
                    </div>
                    <div className='temp'>
                        <Heading size="md">Project 2</Heading>
                        <Progress colorScheme="cyan" hasStripe value={80}></Progress>
                    </div>
                    <div className='temp'>
                        <Heading size="md">Project 3</Heading>
                        <Progress colorScheme="blue" hasStripe value={80}></Progress>
                    </div>
                    <div className='temp'>
                        <Heading size="md">Project 4</Heading>
                        <Progress colorScheme="green" hasStripe value={80}></Progress>
                    </div>
                    <div className='temp'>
                        <Heading size="md">Project 5</Heading>
                        <Progress colorScheme="yellow" hasStripe value={80}></Progress>
                    </div>
                </div>
            </div>
            <div className="outer progressCircle">
                <Heading>Task</Heading>
                <div className="inner progressCircle">
                    <div>
                        <Heading size="md">Task</Heading>
                    </div>
                    <div className="circle">
                        <CircularProgress capIsRound color="red" size="200px" value={80} >
                            <CircularProgressLabel>80%</CircularProgressLabel>
                        </CircularProgress>
                    </div>
                </div>
            </div>
            <div className="outer employees">
                <Heading size="lg">Employees</Heading>
                <div className="inner employees">
                    <DataTable columns={columns} data={users} />
                </div>
            </div>
        </div>
    );
}

export default App;