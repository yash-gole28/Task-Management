import React from 'react'
import { useNavigate } from 'react-router-dom'

const Button = (props) => {
  const navigate = useNavigate()
  return (
    
      <button onClick={() => navigate(props.path)} type="button" className="btn btn-primary"> {props.text} </button>
    
  )
}

export default Button
