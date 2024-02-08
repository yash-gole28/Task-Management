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
            if(response.data.tasks.length === 0){
              toast("no tasks assigned yet")
              navigate('/')
            }
           
        }else{
          toast("there is no task for you yet")
          navigate('/')
          
        }
      
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }
    },[task , setTask])

    const toggleCheck = (index) => {
      const updatedTasks = task.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            isChecked: !item.isChecked,
            completed: !item.isChecked ? 'true' : 'false',
          };
        }
        
        return item;
      });
      setTask(updatedTasks);
    };

    const updateTask =async(index) =>{
      try{
        const tasks = task[index]
        console.log(tasks , "updating") 
        const response = await axios.post('http://localhost:8000/api/v1/tasks/update',{tasks})
        if(response.data.success){
          toast.success("task updated")
        }else{
          toast.error("unable to update task")
        }
      }catch(error){
        toast.error("error")
        console.log(error)
      }
    }
    
    useEffect(()=>{
        if(state?.user?.id !== undefined){
            myTasks(state?.user?.id)
            // console.log(state.user)
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
           <td> <input type="checkbox" name="completed" id="" onChange={()=>toggleCheck(index)} /> {data.isChecked ? <span className='btn btn-primary' onClick={()=>updateTask(index)}> submit</span> : 
            <span className='btn btn-danger' onClick={()=>updateTask(index)}> submit</span>} </td>
         
         </tr>
        
       </tbody>
      ))}
     
    </table> : <div style={{display:"flex",alignItems:"center",justifyContent:'center',height:"400px"}}>Loading <div className="spinner-border text-primary" role="status">
  <span className="visually-hidden">Loading...</span>
</div></div>  
    }

    </div>
  )
}

export default MyTasks
