import React, { useEffect, useState } from 'react'
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

const ListTask = ({tasks,setTasks}) => {
    const [onDeck, setOnDeck] = useState ([]);
    const [blocked, setBlocked] = useState ([]);
    const [inProgress, setInProgress] = useState ([]);
    const [inReview, setInReview] = useState ([]);
    const [ready4Validation, setReady4Validation] = useState ([]);
    const [inValidation, setInValidation] = useState ([]);
    const [done, setDone] = useState ([]);

    useEffect(() =>{
      console.log('iiii');
        const filterOnDeck = tasks.filter((task) => task.status === 'onDeck')
        const filterBlocked = tasks.filter((task) => task.status === 'blocked')
        const filterInProgress = tasks.filter((task) => task.status === 'inProgress')
        const filterInReview = tasks.filter((task) => task.status === 'inReview')
        const filterReady4Validation = tasks.filter((task) => task.status === 'ready4Validation')
        const filterInValidation = tasks.filter((task) => task.status === 'inValidation')
        const filterDone = tasks.filter((task) => task.status === 'done')

        setOnDeck(filterOnDeck);
        setBlocked(filterBlocked);
        setInProgress(filterInProgress);
        setInReview(filterInReview);
        setReady4Validation(filterReady4Validation);
        setInValidation(filterInValidation);
        setDone(filterDone);

    },[tasks]);

    const statuses = ['onDeck','blocked','inProgress','inReview','ready4Validation','inValidation','done', ];

  return (
    <div className='flex gap-16'>
        {
            statuses.map((status, index) => <Section key={index} status={status} tasks={tasks} setTasks={setTasks}
            inProgress={inProgress} onDeck={onDeck} done={done} blocked={blocked} inReview={inReview}
            ready4Validation={ready4Validation} inValidation={inValidation}
            />)
        }
    </div>
  )
}

export default ListTask


const Section = ({status,tasks,setTasks,inProgress,onDeck,done,blocked,inReview,ready4Validation,inValidation}) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        })
      }));  

    let text = 'On Deck';
    let bg = 'bg-slate-500';
    let tasksToMap = onDeck;

    if(status === 'inProgress'){
        text = 'In Progress'
        bg='bg-gray-500'
        tasksToMap = inProgress
    }

    if(status === 'onDeck'){
        text = 'On Deck'
        bg='bg-slate-500'
        tasksToMap = onDeck
    }

    if(status === 'blocked'){
        text = 'Blocked'
        bg='bg-red-500'
        tasksToMap = blocked
    }

    if(status === 'inReview'){
        text = 'In Review'
        bg='bg-sky-500'
        tasksToMap = inReview
    }

    if(status === 'ready4Validation'){
        text = 'Ready 4 Validation'
        bg='bg-violet-500'
        tasksToMap = ready4Validation
    }

    if(status === 'inValidation'){
        text = 'In Validation'
        bg='bg-green-500'
        tasksToMap = inValidation
    }

    if(status === 'done'){
        text = 'Done'
        bg='bg-blue-500'
        tasksToMap = done;
        
    }

    const addItemToSection =(id)=>{
    setTasks((prev) =>{
        const mTask = prev.map((t) =>{
            if(t.id === id){
                if (status === 'inProgress') {
                    return { ...t, status: status };
                  }
                   else if (t.status === 'onDeck') {
                    return { ...t, status: 'inProgress' };
                  } 
                  else if (status === 'blocked') {
                    return { ...t, status: status };
                  } 
                  else if (status === 'inReview') {
                    return { ...t, status: status };
                  }
                  else  if (status === 'ready4Validation') {
                    return { ...t, status: status };
                  }
                   else  if (status === 'inValidation') {
                    return { ...t, status: status };
                  }
                  else if (t.status === 'done') {
                    return t; 
                  }
                   else {
                    return { ...t, status: status };
                  }
              }
            return t;
        })
        return mTask;
    })
    }

  return (
    <div ref={drop} className={`w-32 rounded-md p-2 ${isOver ? "bg-slate-200" : ''}`}>
     <Header text={text}  bg={bg}/>
     {tasksToMap.length > 0  && tasksToMap.map((task) => <Task key={task.id} tasks={tasks} setTasks={setTasks}
        task={task} 
     />)}
    </div>
  )
}

const Header = ({text, bg}) => {
    return (
      <div className={`${bg} flex items-center h-12 pl-4 rounded-md uppercase text-sm text-white` }>
        {text}
      </div>
    )
  }

  const Task = ({task}) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item:{id:task.id},
        canDrag: task.status !== 'done',
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
      }));  
      console.log(isDragging);

    return (
     <div ref={drag}  
     style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
     className={`relative p-4 mt-8 shadow-md rounded-md cursor-grab`}>
       <p>{task.name}</p>
     </div>
    )
  }
