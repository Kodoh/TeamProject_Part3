import '../App.css';
import { Progress, Heading, CircularProgress, CircularProgressLabel, Button, HStack } from '@chakra-ui/react';
import { createColumnHelper } from '@tanstack/react-table';
import { DataTable } from '../Components/DataTable';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        avatar: "https://bit.ly/dan-abramov",
        employee: "Tim Jennings",
        email: "tim.jennings@example.com",
        since: "July 14, 2015",
        role: "Organizer"
    },
    {
        avatar: "https://bit.ly/tioluwani-kolawole",
        employee: "Nathan Roberts",
        email: "nathan.roberts@example.com",
        since: "November 28, 2015",
        role: "Administrator"
    },
    {
        avatar: "https://bit.ly/ryan-florence",
        employee: "Georgia Young",
        email: "georgia.young@example.com",
        since: "March 13, 2014",
        role: "Member"
    }
];

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor("avatar", {
        cell: (info) => info.getValue(),
        header: ""
    }),
    columnHelper.accessor("employee", {
        cell: (info) => info.getValue(),
        header: "Employee",
        sortType: "basic",
    }),
    columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: "Email",
        sortType: "basic",
    }),
    columnHelper.accessor("since", {
        cell: (info) => info.getValue(),
        header: "Member since",
    }),
    columnHelper.accessor("role", {
        cell: (info) => info.getValue(),
        header: "Role",
        sortType: "basic",
    })
];


function App() {
    let navigate = useNavigate();
    const redirectDataAnalytics = () => {
        return navigate("/data-analytics")
    }
    const redirectTextChat = () => {
        return navigate("/text-chat")
    }

    return (
        <div className="App">
            <header>
                <HStack justify="center">
                    <Button onClick={redirectDataAnalytics}>Data Analytics</Button>
                    <Button onClick={redirectTextChat}>Text Chat</Button>
                </HStack>
            </header>

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
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </div>
    );
}

export default App;