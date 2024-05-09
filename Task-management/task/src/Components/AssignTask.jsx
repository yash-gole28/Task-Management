import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AssignTask = () => {
    const {state} = useContext(AuthContext)
    const[data , setData] = useState({name:"" ,Description:"", DueDate:"", Priority:""})
    const navigate = useNavigate()
   
    
    const handleChange = useCallback((event)=>{
      setData({...data,[event.target.name]:event.target.value})
      // console.log(state.state.user.id)
      console.log(state?.user?.id)
  },[setData , data])




    async function handleSubmit(event){
      event.preventDefault()
      try{
       if(state?.user?.type === "admin"){
        const response = await axios.post('http://localhost:8000/api/v1/tasks/task-assign',{name:data.name, Description:data.Description, DueDate:data.DueDate, Priority:data.Priority ,adminId:state?.user?.id})
        if(response.data.success){
          toast.success("task assigned successfully")
        }
      
      }else{
        toast.error('you are not allowed to assign task')
       }
      }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    // useEffect(()=>{
    //     if(state?.user?.type === "admin"){
    //         // const newData = {...data,userId:`${state.user.id}`}
    //     }
    // },[state])
  return (
    <>
    <form className='align-vertical' onSubmit={handleSubmit}>
        <label htmlFor="">Description</label>
        <input type="text" name='Description' onChange={handleChange}/><br />
        <label htmlFor="">Priority</label>
        <input type="text" name='Priority' onChange={handleChange}/><br />
        <label htmlFor="">DueDate</label>
        <input type="date" name='DueDate' onChange={handleChange}/><br />
        <label htmlFor="">Name</label>
        <input type="text" name='name' onChange={handleChange}/><br />
        <button type="submit" className='btn btn-primary'>Assign</button>
      </form>
    </>
  )
}

export default AssignTask
