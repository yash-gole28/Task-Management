import { useContext, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
import { AuthContext } from "./Context/AuthContext"
import List from "./List"
import Button from "./Button"

const Homepage = () => {
    const { state } = useContext(AuthContext)
    // console.log(state)
    //   const navigate = useNavigate()
    const Listdata = [
        "create a assign task page where admin assign task to the user ",
        "create a drop down list where all names of users are shown",
        "create a form format where all data is taken",
        "use radio button for priority , checkbox for completed",
    ]
    useEffect(()=>{
       
        // console.log(Listdata)
    },[state])
    return (
        <div className="home">
            {state?.user ? <h1>Welcome {state?.user?.name}</h1> : <h1>Login to manage tasks</h1>}
            <h3 style={{ margin: '20px' }} className="home-title">Manage and update your tasks with ease</h3>

           
            <List arr={[...Listdata]}/>
            <Button path="/register" text = "click me"/>
        </div>
    )
}

export default Homepage