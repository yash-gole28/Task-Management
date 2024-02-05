import axios from 'axios'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'

const Login = () => {
    const navigate = useNavigate()
    const { Login } = useContext(AuthContext)
    const [userData, setUserData] = useState({ email: '', password: '' })
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const sendDataToBackend = async (event) => {
        event.preventDefault()
        try {
            if (userData.email && userData.password) {
                const response = await axios.post("http://localhost:8001/api/v1/auth/login", { userData })
                if (response.data.success) {
                    localStorage.setItem('my-token', JSON.stringify(response.data.token))
                    Login(response.data.user)
                    console.log(response.data)
                    navigate('/')
                    toast.success(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='form'>
            {/* <form action="" onSubmit={sendDataToBackend}>
                <label htmlFor="">Email :</label>
                <input className="inputs" type="email" name="email" onChange={handleChange} id="" />
                <label htmlFor="">Password :</label>
                <input className="inputs" type="password" name="password" onChange={handleChange} id="" />
                <br />
                <input className="button" type="submit" value="login" />
            </form> */}

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" name="email" onChange={handleChange} />
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password" onChange={handleChange} />
                <label for="floatingPassword">Password</label>
            </div>
            <input className="btn btn-primary button" onClick={sendDataToBackend} type="submit" value="login" />
        </div>
    )
}

export default Login
