import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

const Column = ({ color, title, tasks, setTasks, status, handleTaskRemove }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id) => {
    setTasks(prev => {
      const mTasks = prev.map(t => {
        if (t.id === id) {
          return { ...t, status: status }
        }
        return t;
      })
      localStorage.setItem('tasks', JSON.stringify(mTasks));
      return mTasks;
    })
  };

  const filteredTasks = tasks.filter((task) => task.status === status);

  return (
    <div ref={drop} className={`${isOver ? `bg-${color}-100` : `bg-${color}-50`} rounded-md p-4 h-screen`}>
      <div className={`bg-${color}-400 text-white py-2 w-full p-3 rounded-lg font-bold mb-6 flex gap-4 items-center`}>
        <span>{title.charAt(0).toUpperCase() + title.slice(1)}</span>
        <div className='grid place-items-center bg-white h-6 w-6 rounded-full text-xs text-gray-500 font-normal'>{filteredTasks.length}</div>
      </div>
      <div>
        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <Task key={task.id} task={task} handleTaskRemove={handleTaskRemove} />
          ))
        ) : (
          <span className='text-gray-500 px-4'>No Items presents</span>
        )}
      </div>
    </div>
  );
};

export default Column;
