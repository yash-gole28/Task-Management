import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './Context/AuthContext'

const AssignTask = () => {
    const {state} = useContext(AuthContext)
    const[data , setData] = useState({name:"" ,category:"", description:"", date:"", priority:""})
   
    
    function handleChange(event){
        
    }
    useEffect(()=>{
        if(state?.user){
            console.log(state)
            const newData = {...data,userId:`${state.user.id}`}
            console.log(newData)
           
        }
      
    },[])
  return (
    <>
     <form action="">
        <input type="text" name='name' onChange={handleChange} />    
        <button onClick={()=>console.log(data)}>data</button>
    </form> 
    </>
  )
}

export default AssignTask
