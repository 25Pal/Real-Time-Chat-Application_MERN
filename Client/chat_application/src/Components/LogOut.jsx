import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BiPowerOff } from "react-icons/bi";
// import { useEffect } from 'react'

function LogOut() {
    // {console.log("btn")}
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login")
    };


    return (
        <Button onClick={handleClick}>
            {/* {console.log("btn")} */}
            <BiPowerOff />
        </Button>

    )
}

const Button = styled.button`
    display:flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9573df;
    border:none;
    cursor:pointer;
    svg{
        font-size: 1.3rem;
        color:#ebe7ff;
    }

@media screen and (min-width :379px)  and  (max-width:720px){
  
    padding: 0.2rem;
    border-radius: 0.5rem;
    background-color: #9573df;
    border:none;
    cursor:pointer;
    svg{
        font-size: 1.1rem;
        color:#ebe7ff;
    }
}

@media screen and (min-width :100px) and (max-width:379px){
    padding: 0.1rem;
    border-radius: 0.3rem;
    background-color:transparent;
    border:none;
    cursor:pointer;
    svg{
        font-size: 1.1rem;
        color:#8771f6;
    }
}
`

export default LogOut