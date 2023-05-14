import React, { useEffect, useState } from 'react';
import { Heading, Progress, Button, Flex, Text } from '@chakra-ui/react';

function ProgressBar({ projectData }) {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        if (projectData.length > 0) {
            setStartIndex(0);  // reset the start index when projectData changes
        }
    }, [projectData]);

    const handleClickNext = () => {
        setStartIndex(currStartIndex => {
            return currStartIndex + itemsPerPage
        })
    };

    const handleClickPrevious = () => {
        setStartIndex(currStartIndex => {
            return currStartIndex - itemsPerPage
        })
    };

    const renderProgressBars = () => {
        const visibleProgressBars = projectData.slice(startIndex, startIndex + itemsPerPage);
        const remainingBars = itemsPerPage - visibleProgressBars.length;

        const progressBars = visibleProgressBars.map((project, index) => {
            let date = new Date()
            const totalDays = ((project.remaining_hours / project.total_employee_count) / 7).toFixed(0)
            // Calculate the number of working days by taking the total days, and then adding 2 days for every
            const workingDays = + totalDays + (Math.floor(totalDays / 5) * 2)
            date.setDate(date.getDate() + workingDays)
            return (
                <Flex key={index} className='temp' border={new Date(project.end_date) > new Date() ? '1px solid gray' : '1px solid red'} borderRadius='0.5em' padding='1em'>
                    <Heading size='md'>{project.project_name}</Heading>
                    <Flex flexDir='column' gap='0.5em'>
                        <Flex justify='space-between' align='center'>
                            <Text as='b' size='xs'>{new Date(project.start_date).toLocaleDateString()}</Text>
                            <Text as='b' size='xs'>{new Date(project.end_date).toLocaleDateString()}</Text>
                        </Flex>
                        <Progress colorScheme={date < new Date(project.end_date) ? 'blue' : 'red'} rounded='md' value={project.progress} />
                        <Text>Remaining hours: {project.remaining_hours} - Number of staff on project: {project.total_employee_count} - Estimated finish time: {date.toLocaleDateString()} </Text>
                    </Flex>
                </Flex>
            )
        });

        for (let i = 0; i < remainingBars; i++) {
            progressBars.push(
                <div key={`remaining-${i}`} className='temp'>
                    <Heading size='md'>&nbsp;</Heading>
                    <Progress rounded='md' colorScheme='gray' value={0} />
                </div>
            );
        }

        return progressBars;
    };

    return (
        <div className='outer progress'>
            <Heading size='lg'>Projects</Heading>
            <div className='inner progress'>
                {renderProgressBars()}
            </div>
            {startIndex > 0 && (
                <Button onClick={handleClickPrevious}>
                    Previous
                </Button>
            )}
            {startIndex + itemsPerPage < projectData.length && (
                <Button onClick={handleClickNext}>
                    Next
                </Button>
            )}
        </div>
    );
}

export default ProgressBar;