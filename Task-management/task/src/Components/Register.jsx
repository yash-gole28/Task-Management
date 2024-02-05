import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
// import { AuthContext } from './Context/AuthContext'

const Register = () => {
    // const {state} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userData , setUserData] = useState({name:"", email:"",password:"",type:""})
    const handleChange = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
        console.log(userData)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            const response = await axios.post("http://localhost:8001/api/v1/auth/register",{userData})
            if(response.data.success){
                toast.success('successfully registered')
                setUserData({name:"", email:"",password:"",type:""})
                navigate('/login')
            }
        }catch(error){
            toast.error(error.response.data.message)
            console.log(error)
        }
    }
  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <label htmlFor="">Name</label><br />
        <input type="text" name='name' value={userData.name} onChange={handleChange} /><br />
        <label htmlFor="">Email</label><br />
        <input type="email" name='email' value={userData.email} onChange={handleChange} /><br />
        <label htmlFor="">Password</label><br />
        <input type="password"name='password' value={userData.password} onChange={handleChange} /><br />
        <h4>Help to generate password -</h4>
        {/* <button className=''>To Password generator</button> */}
        <Button path = "/password" text = "help to generate password "/> <br />
        <label htmlFor="">Type</label><br />
        <label htmlFor="radio">admin</label>
        <input type="radio" name="type" value="admin" onChange={handleChange} id="" />
        <label htmlFor="radio">user</label>
        <input type="radio" name="type" value="user" onChange={handleChange} id="" /><br /><br />
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}

export default Register
