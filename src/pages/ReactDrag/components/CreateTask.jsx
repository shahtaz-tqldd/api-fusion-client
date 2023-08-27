import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {
  const handleTask = (e) => {
    e.preventDefault()
    const taskName = e.target.taskName.value
    if (taskName.length <= 3) {
      toast.error("Your taskname shouldn't be less than 3 strings")
    } else {
      setTasks([...tasks, { id: uuidv4(), name: taskName, status: 'todo' }])
      e.target.reset()
    }
  }
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks?.length])

  return (
    <form onSubmit={handleTask} className='flex gap-2 justify-center mt-6'>
      <input type='text' id='taskName' placeholder='Name a task' className='input border border-blue-500 border-2 py-2 px-4 rounded-lg ' />
      <button className='btn py-2 px-6 bg-blue-500 rounded-lg border-2 border-blue-500 text-white hover:bg-blue-400 hover:border-blue-400 transition duration-300'>
        Create +
      </button>
    </form>
  )
}

export default CreateTask
