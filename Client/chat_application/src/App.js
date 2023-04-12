import React from 'react'
import Login from './Components/Login';
import Register from './Components/Register';
import Chat from './Components/Chat';
import SetAvatar from './Components/SetAvatar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
// import Welcome from './Components/Welcome';
export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/login' element={ <Login/>}/>
        <Route path='/' element={<Chat/>}/>
        <Route path='/avatar' element={<SetAvatar/>}/>
        {/* <Route path ='/welcome' element={<Welcome/>}/> */}
      </Routes>
   
      
    </BrowserRouter>
      
    </>
  );
}


