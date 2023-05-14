import { Button, CircularProgress, CircularProgressLabel, Heading, Flex, Text, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'

const TaskProgress = ({ tasks }) => {
    const [taskIndex, setTaskIndex] = useState(0)

    const handleNextTask = () => {
        setTaskIndex(currentIndex => {
            return Math.min(currentIndex + 1, tasks.length)
        })
    };

    const handlePreviousTask = () => {
        setTaskIndex(currentIndex => {
            return Math.max(currentIndex - 1, 0)
        })
    };

    useEffect(() => {
    }, [taskIndex])

    return (
        <div className="outer progressCircle">
            <Heading>Task</Heading>
            <div className="inner progressCircle">
                <div>
                    <Flex justify='space-between' align='center'>
                        <Heading size="md">{tasks.length === 0 ? 'No tasks' : tasks[taskIndex].task_name}</Heading>
                        <Text as='b'>{Math.min(taskIndex + 1, tasks.length)}/{tasks.length}</Text>
                    </Flex>
                </div>
                <div className="circle">
                    <CircularProgress capIsRound color="red" size="200px" value={tasks.length === 0 ? 'NAN' : ((tasks[taskIndex].hoursCompleted / tasks[taskIndex].totalManhours) * 100) + 0.000000001}>
                        <CircularProgressLabel>{tasks.length === 0 ? 'NAN' : `${((tasks[taskIndex].hoursCompleted / tasks[taskIndex].totalManhours) * 100).toFixed(1)}%`}</CircularProgressLabel>
                    </CircularProgress>
                </div>
                <Box position='relative'>
                    {taskIndex > 0 && <Button position='absolute' bottom='0' left='0' onClick={handlePreviousTask}>Previous Task</Button>}
                    {tasks.length - 1 > taskIndex && <Button position='absolute' bottom='0' right='0' onClick={handleNextTask}>Next Task</Button>}
                </Box>
            </div>
        </div>
    );
};

export default TaskProgress;