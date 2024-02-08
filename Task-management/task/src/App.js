
import './App.css';
import {Routes , Route} from 'react-router-dom'
import Homepage from './Components/Homepage';
import Register from './Components/Register';
import Login from './Components/Login';
import Tasks from './Components/Tasks';
import Navbar from './Components/Navbar';
import MyTasks from './Components/MyTasks';
import PasswordGenerator from './Components/PasswordGenerator';
import UpdateTask from './Components/UpdateTask';
import SingleTask from './Components/SingleTask';
import AssignTask from './Components/AssignTask';


function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/tasks' element={<Tasks/>}/>
      <Route path='/mytasks' element={<MyTasks/>}/>
      <Route path='/password' element={<PasswordGenerator/>}/>
      <Route path='/update/:id' element={<UpdateTask/>}/>
      <Route path='/task/:id' element={<SingleTask/>}/>
      <Route path='/assign-task' element={<AssignTask/>}/>

      
      
     </Routes>
      
    </div>
  );
}

export default App;
