import { useState } from 'react'
import './App.css'
import CreateTask from './components/CreateTask';
import ListTask from './components/ListTask';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([]);
  console.log('tasks:', tasks)

  return (
      <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='bg-slate-100 w-screen h-screen flex flex-col items-center p-3 gap-16 pt-28'>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTask tasks={tasks} setTasks={setTasks}/>
      </div>
      </DndProvider>
  )
}

export default App

