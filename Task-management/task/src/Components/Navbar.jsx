import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import toast from 'react-hot-toast'

const Navbar = () => {
  const navigate = useNavigate()
  const { Logout, state } = useContext(AuthContext)
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (state?.user !== undefined) {

      if (state?.user?.type === 'admin') {
        // console.log(state)
        setAdmin(true)
      }
    }
  }, [state])
  return (
    <div >
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand">Task Management</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span className="nav-link active" aria-current="page" onClick={() => navigate('/')}>Home</span>
              </li>
              <li className="nav-item">
                {admin ? <span onClick={() => { navigate('/tasks') }} className='nav-link'>All Tasks</span> : <span className='nav-link ' onClick={() => { toast.error('only Admin have Access') }}>All Tasks</span>}
              </li>
              <li className="nav-item">
                {!admin ? <span onClick={() => { navigate('/mytasks') }} className='nav-link'>My Tasks</span> : <span className='nav-link ' onClick={() => { toast.error('this page is for users') }}>My Tasks</span>}
              </li>

            </ul>

            {state?.user ? <span className='name'>{state?.user?.type} : {state?.user?.name}</span> : <span className='name'>Unknown</span>}
            {state?.user ? <button className='btn bg-danger' onClick={Logout} >Logout</button> : <button className='btn btn-success' onClick={() => navigate('/login')}>Login</button>}
            {state?.user ? <></> : <span onClick={() => { navigate('/register') }} style={{ marginLeft: "10px" }} className='btn btn-success '>Register</span>}

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
