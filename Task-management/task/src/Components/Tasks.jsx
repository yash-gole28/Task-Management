import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Tasks = () => {
    const{state} = useContext(AuthContext)
    const [task , setTasks] = useState([])
    const navigate = useNavigate()

    async function allTasks(){
      try{
        const response = await axios.get("http://localhost:8000/api/v1/tasks/all-tasks")
        if(response.data.success){
          // console.log(response.data)
          setTasks(response.data.tasks)
          // console.log(tasks)
        }
      }catch(error){
        toast.error(error)
      }
    }
    
    useEffect(()=>{
      
        if(state?.user?.type === "admin"){
        
          allTasks()
          // console.log(task)
      }
      
       
    },[state])
  return ( 
    <div style={{margin:'1px'}}>
      <h1>
        Your Tasks
      </h1>
      {state?.user?.type === 'admin' ? 
      <table className="table table-striped" >
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          <th scope="col">User Id</th>
          <th scope="col">Priority</th>
          <th scope="col">Due Date</th>
        </tr>
      </thead>
      {task.map((data , index)=>(
         <tbody key={data._id}>
         <tr >
           <th scope="row">{index + 1}</th>
           <td>{data.Description}</td>
           <td>{data._id}</td>
           <td>{data.Priority}</td>
           <td>{data.DueDate}</td>
           <td onClick={()=>navigate(`/update/${data._id}`)}> <Button  text = "edit"/> </td>
         
         </tr>
        
       </tbody>
      ))}
     
    </table> : <div>Only Admin have access</div>  
    }
     
    

    </div>
  )
}

export default Tasks
