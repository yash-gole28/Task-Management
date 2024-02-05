import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateTask = () => {
    const {id} = useParams()
    const {state} = useContext(AuthContext)
    const [tasks , setTask] = useState({})

    // console.log(id)

    async function getTask(){
        try{
            const response =await axios.get(`http://localhost:8000/api/v1/tasks/single?id=${id}`)
            if(response.data.success){
                setTask(response.data.task)
                console.log(tasks)
                toast.success('task found')
            }
        }catch(error){
            console.log(error)
        }
    }

    async function handleSubmit(event){
       try{
        event.preventDefault()
        const updateData = await axios.post("http://localhost:8000/api/v1/tasks/update",{tasks})
        if(updateData.data.success){
            toast.success('task updated')
        }
       }catch(error){
        console.log(error)
    }
    }
    function handleChange(event){
        setTask({...tasks , [event.target.name]:event.target.value})
        console.log(tasks)
    }

    // http://localhost:8000/api/v1/tasks/

useEffect(()=>{
if(state?.user?.type == 'admin'){
    getTask()
    // console.log(tasks)
    
}
},[state])
  return (
    <div>
      <h1>update task</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Description</label>
        <input type="text"value={tasks.Description} name='Description' onChange={handleChange}/><br />
        <label htmlFor="">Priority</label>
        <input type="text"value={tasks.Priority} name='Priority' onChange={handleChange}/><br />
        <label htmlFor="">DueDate</label>
        <input type="date"value={tasks.DueDate} name='DueDate' onChange={handleChange}/><br />
        <label htmlFor="">Name</label>
        <input type="text"value={tasks.name} name='name' onChange={handleChange}/>
        <button type="submit"></button>
      </form>
        <button onClick={()=>console.log(tasks)}>btn</button>
    </div>
  )
}

export default UpdateTask
