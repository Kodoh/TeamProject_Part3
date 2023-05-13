import React, { useEffect, useState } from 'react';
import { Heading, Progress, Button } from '@chakra-ui/react';

function ProgressBar({ projectData }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    if (projectData.length > 0) {
      setStartIndex(0);  // reset the start index when projectData changes
    }
  }, [projectData]);

  const handleClickNext = () => {
    const nextIndex = startIndex + itemsPerPage;
    setStartIndex(nextIndex);
  };

  const handleClickPrevious = () => {
    const previousIndex = startIndex - itemsPerPage;
    setStartIndex(previousIndex);
  };

  const renderProgressBars = () => {
    const visibleProgressBars = projectData.slice(startIndex, startIndex + itemsPerPage);
    const remainingBars = itemsPerPage - visibleProgressBars.length;

    const progressBars = visibleProgressBars.map((project, index) => (
      <div key={index} className='temp'>
        <Heading size='md'>{project.project_name}</Heading>
        <Progress hasStripe value={calculateProgress(project.start_date, project.end_date)} />
      </div>
    ));

    for (let i = 0; i < remainingBars; i++) {
      progressBars.push(
        <div key={`remaining-${i}`} className='temp'>
          <Heading size='md'>&nbsp;</Heading>
          <Progress colorScheme='gray' value={0} />
        </div>
      );
    }

    return progressBars;
  };

  const calculateProgress = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (now < start) {
      // The project hasn't started yet
      return 0;
    } else if (now > end) {
      // The project has ended
      return 100;
    } else {
      // The project is in progress
      const totalDuration = end - start;
      const elapsed = now - start;
      return (elapsed / totalDuration) * 100;
    }
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
