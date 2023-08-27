import React, { useEffect, useState } from 'react';
import CreateTask from './components/CreateTask';
import Column from './components/Column';

const ReactDrag = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleTaskRemove = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
  };

  return (
    <div className=''>
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <div className='grid grid-cols-3 gap-5 mt-6'>
        <Column color='red' title='todo' tasks={tasks} setTasks={setTasks} status='todo' handleTaskRemove={handleTaskRemove} />
        <Column color='green' title='progress' tasks={tasks} setTasks={setTasks} status='progress' handleTaskRemove={handleTaskRemove} />
        <Column color='blue' title='done' tasks={tasks} setTasks={setTasks} status='done' handleTaskRemove={handleTaskRemove} />
      </div>
    </div>
  );
};

export default ReactDrag;
