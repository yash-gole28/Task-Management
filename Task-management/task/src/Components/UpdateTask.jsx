import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const UpdateTask = () => {
    const {id} = useParams()
    const {state} = useContext(AuthContext)
    const [tasks , setTask] = useState({})
    const navigate = useNavigate()
    // console.log(id)

    const getTask = useCallback(async()=>{
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
    },[setTask])

    async function handleSubmit(event){
       try{
        event.preventDefault()
        const updateData = await axios.post("http://localhost:8000/api/v1/tasks/update",{tasks})
        if(updateData.data.success){
            toast.success('task updated')
            navigate("/tasks")
        }
       }catch(error){
        console.log(error)
    }
    }
    function handleChange(event){
        setTask({...tasks , [event.target.name]:event.target.value})
        // console.log(tasks)
    }

    // http://localhost:8000/api/v1/tasks/

useEffect(()=>{
if(state?.user?.type === 'admin'){
    getTask()
    // console.log(tasks) 
}
},[state])
useEffect(()=>{
    console.log("get task complete")
},[getTask])
  return (
    <div>
      <h1>update task</h1>
      <form className='align-vertical' onSubmit={handleSubmit}>
        <label htmlFor="">Description</label>
        <input type="text"value={tasks.Description} name='Description' onChange={handleChange}/><br />
        <label htmlFor="">Priority</label>
        <input type="text"value={tasks.Priority} name='Priority' onChange={handleChange}/><br />
        <label htmlFor="">DueDate</label>
        <input type="date"value={tasks.DueDate} name='DueDate' onChange={handleChange}/><br />
        <label htmlFor="">Name</label>
        <input type="text"value={tasks.name} name='name' onChange={handleChange}/><br />
        <button type="submit" className='btn btn-primary'>Update</button>
      </form>
    </div>
  )
}

export default UpdateTask
