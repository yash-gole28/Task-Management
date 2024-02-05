import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'
import toast from 'react-hot-toast'
import axios from 'axios'

const MyTasks = () => {
    const [task , setTask] = useState([])
    const {state} = useContext(AuthContext)
    async function myTasks(){
        try{
            const response = await axios.post('http://localhost:8000/api/v1/tasks/get-task',{id:state?.user?._id})
            if(response.data.success){
                setTask(response.data.tasks)
                toast('your tasks ')
                // console.log(task)
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
        if(state?.user){
            myTasks()
            // console.log(task)
        }
    },[state])
  return (
    <div>
      <h1>here are your tasks</h1>
     

{state?.user ? 
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
     
    </table> : <div>Only Admin have access</div>  
    }

    </div>
  )
}

export default MyTasks
