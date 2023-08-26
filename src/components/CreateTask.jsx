import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const CreateTask = ({tasks,setTasks}) => {
    const [task,setTask] = useState({
        id:'',
        name:'',
        status: 'onDeck'
    })
    console.log(task)

    const handleSubmit = (e) =>{
      e.preventDefault();
      if(task.name.length < 5) {
        return toast.error('Task must have more than 5 character!')
      }
      setTasks((prev) => {
        const list = [...prev, task];
        return list;
      });
        toast.success('Tasks Created');

        setTask({
        id:'',
        name:'',
        status: 'onDeck'
        })

    };

  return (
    <form onSubmit={handleSubmit}>
        <input type='text' 
        value={task.name}
        className='border-2 border-slate-400 bg-slate-100 rounded-md mr-4 h-12 w-64 px-1' 
         onChange={(e) => setTask({...task, id: uuidv4(), name: e.target.value})}
        />
        <button className='bg-cyan-500 rounded-md px-4 h-12 text-white'>Submit</button>
    </form>
  )
}

export default CreateTask