import { createContext, useEffect, useReducer } from "react";
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext()

const ParentAuthContext = ({children})=>{

    const navigate = useNavigate()

    const initialState = {user : null}
    
    const reducer = (state , action)=>{
        switch(action.type){
            case "LOGIN" :
                return {...state , user:action.payload}

            case "LOGOUT" :
                return{state , user:null}

            default:
                return {state}
        }
    }

    const [state , dispatch] = useReducer(reducer , initialState)

    const Login = (data)=>{
        dispatch({type:"LOGIN",payload:data})
       

    }

    const Logout =()=>{
        dispatch({type:"LOGOUT"})
        localStorage.removeItem("my-token")
        navigate('/')
        toast.success('Logged out')
    }

    useEffect(()=>{
     async  function currentUser(){
        try{
            const response = await axios.post('http://localhost:8001/api/v1/auth/current-user',{token})
            if(response.data.success){
                Login(response.data.user)
                // console.log(response.data.user)
            }
        }catch(error){
            // toast.error(error.response.data.message)
            console.log(error)
        }
    }
       
        const token = JSON.parse(localStorage.getItem("my-token"))
        // console.log(token)
        if(token){
            currentUser()
        }
    },[])

    return(
        <AuthContext.Provider value={{state , Login , Logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default ParentAuthContext