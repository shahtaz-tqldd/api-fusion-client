import React from 'react';
import { useDrag } from 'react-dnd';
import { AiOutlineMinusCircle } from 'react-icons/ai';

const Task = ({ task, handleTaskRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white py-2 px-4 rounded-md my-3 shadow-lg flex border border-gray-300 cursor-move ${
        isDragging ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <p className='w-[90%] text-gray-600'>{task.name}</p>
      <button
        onClick={() => handleTaskRemove(task.id)}
        className='w-[10%] flex justify-end items-start'
      >
        <AiOutlineMinusCircle className='text-lg text-gray-400 hover:text-red-500 transition duration-300' />
      </button>
    </div>
  );
};

export default Task;
