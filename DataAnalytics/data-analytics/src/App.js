import './App.css';
import { Button, Heading,} from '@chakra-ui/react';
import { createColumnHelper, useSortBy } from '@tanstack/react-table';
import { DataTable } from './DataTable';
import ProgressBar from './ProgressBar';
import TaskProgress from './TaskProgress';

import React, { useEffect, useState } from 'react';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('avatar', {
    cell: (info) => info.getValue(),
    header: ''
  }),
  columnHelper.accessor('employee_name', {
    cell: (info) => info.getValue(),
    header: 'Employee',
    sortType: 'basic'
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: 'Email',
    sortType: 'basic'
  }),
  columnHelper.accessor('joindate', {
    cell: (info) => info.getValue(),
    header: 'Member since'
  }),
  columnHelper.accessor('role', {
    cell: (info) => info.getValue(),
    header: 'Role',
    sortType: 'basic'
  })
];

function App() {
    const [employees, setEmployees] = useState([]);
    const [task, setTask] = useState(null);
    const [taskId, setTaskId] = useState(1);
    const [projects, setProjects] = useState([]);
  
    const fetchTask = (id) => {
      fetch(`http://localhost:8080/dataAnalytics/task/${id}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.data.length > 0) {
            setTask(result.data[0]);
          } else {
            console.log('No task data received');
          }
        })
        .catch((error) => console.error('Error fetching task:', error));
    }
    
  

    const handleNextTask = () => {
      const nextId = taskId + 1;
      fetchTask(nextId);
      setTaskId(nextId);
    };
  
    const handlePreviousTask = () => {
      const prevId = Math.max(1, taskId - 1);  // Ensure the ID is not less than 1
      fetchTask(prevId);
      setTaskId(prevId);
    };
  
    useEffect(() => {
        fetch('http://localhost:8080/dataAnalytics/employees')
          .then((response) => response.json())
          .then((result) => {
            const mappedData = result.data.map((item) => ({
              avatar: '', // Placeholder for Avatar
              employee_name: item.employee_name,
              email: item.email,
              joindate: new Date(item.joindate).toLocaleDateString(),
              role: item.role
            }));
            setEmployees(mappedData);
          })
          .catch((error) => console.error(error));
    
        fetchTask(taskId);
        fetch('http://localhost:8080/dataAnalytics/projects')
        .then((response) => response.json())
        .then((result) => {
          setProjects(result.data);
        })
        .catch((error) => console.error(error));
    }, []);
    
  
    return (
      <div className="App">
        <header>
          <Heading>Make-It-All</Heading>
        </header>
  
        <ProgressBar projectData={projects} />
        <div>
        <TaskProgress task={task} handleNextTask={handleNextTask} handlePreviousTask={handlePreviousTask} taskId={taskId} />

        </div>
  
        <div className="outer employees">
          <Heading size="lg">Employees</Heading>
          <div className="inner employees">
            <DataTable columns={columns} data={employees} />
          </div>
        </div>
      </div>
    );
  }
  
  export default App;