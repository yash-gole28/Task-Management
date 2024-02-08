import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MyTasks = () => {
    const [task , setTask] = useState([])
    const {state} = useContext(AuthContext)
    const navigate = useNavigate()
    const myTasks = useCallback(async (id)=>{
      try{
        const response = await axios.post('http://localhost:8000/api/v1/tasks/get-task',{id})
        if(response.data.success){
            setTask(response.data.tasks)
            console.log(response.data.tasks.length)
            if(response.data.tasks.length === 0){
              toast("there is no task for you yet")
              navigate('/')
            }
            // console.log(task)
        }else{
          toast("there is no task for you yet")
          
        }
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }
    },[task , setTask])
    useEffect(()=>{
        if(state?.user !== undefined){
            myTasks(state?.user?.id)
        }
    },[state])

  return (
    <div>
      <h1>here are your tasks</h1>
     

{task?.length ? 
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Description</th>
          {/* <th scope="col">User Id</th> */}
          <th scope="col">Priority</th>
          <th scope="col">Due Date</th>
          <th scope="col">completed</th>
        </tr>
      </thead>
      {task.map((data , index)=>(
         <tbody key={data._id}>
         <tr >
           <th scope="row">{index + 1}</th>
           <td>{data.Description}</td>
           {/* <td>{data._id}</td> */}
           <td>{data.Priority}</td>
           <td>{data.DueDate}</td>
           <td> <input type="checkbox" name="" id="" /> </td>
         
         </tr>
        
       </tbody>
      ))}
     
    </table> : <div style={{display:"flex",alignItems:"center",justifyContent:'center',height:"400px"}}>Loading <div class="spinner-border text-primary" role="status">
  <span class="visually-hidden">Loading...</span>
</div></div>  
    }

    </div>
  )
}

export default MyTasks
