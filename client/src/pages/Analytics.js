import '../App.css';
import { Heading, Flex } from '@chakra-ui/react';
import { createColumnHelper, useSortBy } from '@tanstack/react-table';
import { DataTable } from '../Components/DataTable';
import ProgressBar from '../Components/ProgressBar';
import TaskProgress from '../Components/TaskProgress';

import React, { useEffect, useState } from 'react';

const columnHelper = createColumnHelper();

const columns = [
    columnHelper.accessor('Name', {
        cell: (info) => info.getValue(),
        header: 'Name',
        sortType: 'basic'
    }),
    columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: 'Email',
        sortType: 'basic'
    }),
    columnHelper.accessor('joindate', {
        cell: (info) => info.getValue(),
        header: 'Member since',
        sortType: 'basic'
    }),
    columnHelper.accessor('role', {
        cell: (info) => info.getValue(),
        header: 'Role',
        sortType: 'basic'
    })
];

function Analytics() {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([])

    const fetchTasks = () => {
        console.log(`/dataAnalytics/employeeTasks/${sessionStorage.getItem('userId')}`)
        fetch(`/dataAnalytics/employeeTasks/${sessionStorage.getItem('userId')}`)
            .then((response) => response.json())
            .then((result) => setTasks(result.data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }

    useEffect(() => {
        fetchTasks();
        fetch('/dataAnalytics/employees')
            .then((response) => response.json())
            .then((result) => {
                const mappedData = result.data.map((item) => ({
                    Name: item.Name,
                    email: item.email,
                    joindate: new Date(item.joindate).toLocaleDateString(),
                    role: item.role
                }));
                setEmployees(mappedData);
            })
            .catch((error) => console.error(error));
        fetch('/dataAnalytics/projects')
            .then((response) => response.json())
            .then((result) => {
                setProjects(result.data);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="App">
            <Flex flexDir='column' flexBasis='100%'>
                <Flex flexBasis='66%'>
                    <ProgressBar projectData={projects} />
                    <TaskProgress tasks={tasks} />
                </Flex>
                <div className="outer employees">
                    <Heading size="lg">Employees</Heading>
                    <div className="inner employees">
                        <DataTable columns={columns} data={employees} />
                    </div>
                </div>
            </Flex>
        </div>
    );
}

export default Analytics;