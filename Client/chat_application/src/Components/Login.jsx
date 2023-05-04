import React, { useState, useEffect } from 'react';
import logo from "../img/logo.png";

import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import { loginRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import styled from 'styled-components';

function Login() {
  const navigate = useNavigate();

  const [Ivalue, setIValue] = useState({
    username: "",
    userpassword: ""
  })

  const toastOptions = {
    position: "bottom-right",
    ResizeObserverSize: "small",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  //^^^^^ If user is loggedin or register already then app will redirect user to chat page 

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  })


//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ When we submit the form ^^^^^^^^^^^^^^^^^^^^^^\\
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
     console.log("inside valid")
      const { username, userpassword } = Ivalue;
      const { data } = await axios.post(loginRoute, { username, userpassword });
     console.log(data)
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        
        localStorage.setItem('chat-app-user', JSON.stringify(data.checkUser));
        const user = await JSON.parse(localStorage.getItem("chat-app-user")); 
        user.Online= true;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        // alert("Logged In Sucessfully !");
        navigate("/");
      }
    }

  }

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ FrontEnd validation ^^^^^^^^^^^^^^^^^^^^^^\\

  const handleValidation = () => {
    const { username, userpassword } = Ivalue;

    if (username === "") {
      toast.error("Username Required!", toastOptions);
      return false;
    } else if (userpassword === "") {
      toast.error("Password is Required !", toastOptions);
      return false;
    } else {
      return true;
    }
  }

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Setting Input value in State value ^^^^^^^^^^^^^^^^^^^^^^\\

  const handleChange = (e) => {

    const { name, value } = e.target;
    setIValue(() => {
      return {
        ...Ivalue,
        [name]: value
      }
    })
    // setIValue({
    //     ...Ivalue,[e.target.name]:e.target.value
    // })

  }

  return (
    <>
      <Section>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={logo} alt="logo" />
            <h1>Quick Chat</h1>
          </div>
          <input
            type="text"
            placeholder='Username'
            name="username"
            onChange={(e) => handleChange(e)}
            value={Ivalue.username}
          />
          <input
            type='password'
            placeholder='Password'
            name='userpassword'
            onChange={(e) => handleChange(e)}
            value={Ivalue.userpassword}
          />

          <button type='submit'>Log In</button>
          <span> Dont't have an Account ? <NavLink to={"/register"}>Sign Up</NavLink>    </span>
        </form>
      </Section>
      <ToastContainer />

    </>

  )

}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  CSS partrt ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const Section = styled.div`
height: 100vh;
width:100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
background-color: #040428;

.brand{
    display: flex;
    align-items:center;
    gap: 1rem;
    justify-content: center;
    
    img{
        height: 5rem;
        
     }

     h1{
        color: white;
        text-transform: uppercase;
     }
 }

form{
    display: flex;
    flex-direction: column;
    gap:2rem;
    background-color: #090024ca;
    border-radius : 2rem ;
    padding : 3rem 5rem;

    input{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid  #0eb3ff;
        box-shadow:  5px 1px 10px #0eb3ff;
        border-radius: 0.4rem;
        color: rgb(150, 226, 243);
        width: 100%;
        font-size: 1rem;

        &:focus{
            border: 0.1rem solid #4e23c4;
            outline:none;
         }
       
      }

      button{
        background-color :#997af0;
        color: white;
        padding : 1rem 2rem ;
        border:none;
        font-weight :bold;
        cursor:pointer;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition: 0.5s ease-in-out;

        &:hover{
            background-color: #4e0eff;
        }
        

      }
      span{
            color: white;
            text-transform: uppercase;
            a{
                color: #4e0eff;
                text-decoration:none;
                font-weight: bold;
                
            }
        }
      
 
  }


`

export default Login;