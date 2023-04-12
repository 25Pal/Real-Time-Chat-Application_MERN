import React, { useState, useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import logo from "../assets/logo.svg"
import { NavLink, useNavigate } from 'react-router-dom';
import axios from "axios"
import { registerRoute } from '../utils/APIRoutes';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import styled from 'styled-components';

function Register() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)
    const [showConfirmPass,setShowConfirmPass]=useState(false)

    const [Ivalue, setIValue] = useState({
        username: "",
        email: "",
        userpassword: "",
        confirmpassword: ""
    })


    const toastOptions = {
        position: "bottom-right",
        ResizeObserverSize: "small",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    }

//^^^^^^^^^^^^^^^^^^^^^^^^ User already login / Rgister ^^^^^^^^^^^^^^^^^^^^\\
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {

            const { username, email, userpassword } = Ivalue;
            const { data } = await axios.post(registerRoute, {username, email, userpassword });

            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }

            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.createUser));
                alert("Congratulatons..! User Created Succesfully.");
                navigate("/");
            }
        }
    }

//^^^^^^^^^^^^^^^^^^^^^^^^ Frontend Validation ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

    const handleValidation = () => {
        const { username, email, userpassword, confirmpassword } = Ivalue;

        if (username === "") {
            toast.error("Username Required!", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("Email is Required!", toastOptions);
            return false;
        } else if (!email.includes("@")) {
            toast.error("Invalid Email !", toastOptions);
            return false;
        } else if (userpassword === "") {
            toast.error("Password is Required !", toastOptions);
            return false;
        } else if (userpassword.length < 7) {
            toast.error("Password Must be Strong !", toastOptions);
            return false;
        } else if (confirmpassword !== userpassword) {
            toast.error("Confirm password is wrong !", toastOptions);
            return false;
        } else {
            return true;
        }
    }

//^^^^^^^^^^^^^^^^^^^^^^^^ Setting Input value in State value ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
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

//^^^^^^^^^^^^^^^^^^^^^^^^ Main Component part ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

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
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={(e) => handleChange(e)}
                        value={Ivalue.email}
                    />
                    <div className='merge'>
                        <input

                            type={!showPass ? "password" :'text'}
                            placeholder='Password'
                            name='userpassword'

                            onChange={(e) => handleChange(e)}
                            value={Ivalue.userpassword}
                            

                        />
                        <div className='see' onClick={()=>setShowPass(!showPass)}>
                            {!showPass?<VisibilityIcon /> : <VisibilityOffOutlinedIcon/>}
                            </div>

                    </div>

                    <div className='merge'>
                    <input
                        type={!showConfirmPass ?"password":"text"}
                        placeholder='Confirm Password'
                        name='confirmpassword'
                        onChange={(e) => handleChange(e)}
                        value={Ivalue.confirmpassword}
                    />
                     <div className='see' onClick={()=>setShowConfirmPass(!showConfirmPass)}>
                            {!showConfirmPass?<VisibilityIcon /> : <VisibilityOffOutlinedIcon/>}
                     </div>
                    </div>
                    
                    <button type='submit'>Create User</button>
                    <span> Already have an Account ? <NavLink to={"/login"}>Log In</NavLink>    </span>
                </form>
            </Section>
            <ToastContainer />

        </>

    )

}

//^^^^^^^^^^^^^^^^^^^^^^^^ CSS Part  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

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

     .merge{
       
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border: 0.1rem solid  #0eb3ff;
        box-shadow:  5px 1px 10px #0eb3ff;
        border-radius: 0.4rem;
        color: rgb(150, 226, 243);
        padding: 0.8rem;
     
        input{
        background-color: transparent;
        padding: 0.1rem;
        border: 0rem solid  #090024ca;
        box-shadow:  0px 0px  #0eb3ff;
        border-radius: 0.4rem;
        color: rgb(150, 226, 243);
        width: 100%;
        font-size: 1rem;

        }
        &:focus{
            border: 0.1rem solid #4e23c4;
            outline:none;
         }

        .see{
        color:rgb(150, 226, 243); 
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

export default Register;