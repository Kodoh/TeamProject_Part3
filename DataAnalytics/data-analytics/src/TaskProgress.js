import { Button, CircularProgress, CircularProgressLabel, Heading } from '@chakra-ui/react';

const TaskProgress = ({ task, handleNextTask, handlePreviousTask, taskId }) => {
  if (!task) {
    return <div>Loading task...</div>;
  }

  const { task_name, hoursCompleted, totalManhours } = task;
  const progress = (hoursCompleted / totalManhours) * 100;

  return (
    <div className="outer progressCircle">
      <Heading>Task</Heading>
      <div className="inner progressCircle">
        <div>
          <Heading size="md">{task_name}</Heading>
        </div>
        <div className="circle">
          <CircularProgress capIsRound color="red" size="200px" value={progress}>
            <CircularProgressLabel>{`${progress.toFixed(2)}%`}</CircularProgressLabel>
          </CircularProgress>
        </div>
        {taskId > 1 && <Button onClick={handlePreviousTask}>Previous Task</Button>}
        <Button onClick={handleNextTask}>Next Task</Button>
      </div>
    </div>
  );
};

export default TaskProgress;
