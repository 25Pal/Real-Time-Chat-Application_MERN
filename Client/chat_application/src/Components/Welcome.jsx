import React from 'react'
import styled from "styled-components"
import Robot from "../assets/robot.gif"

function Welcome({ currentUser }) {

    return (
        <Container>

            <img src={Robot} alt="robot" />
            <h1>
                Welcome, <span>{currentUser.username}! </span>
            </h1>
            <h3>Please select a chat to start Messaging.</h3>
        </Container>
    )
}

const Container = styled.div` 
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color:white;
    img{
            height :20rem;
    }
    span{
        color:turquoise;
    }
    
    
    @media screen and (min-width :100px) and (max-width:379px)  {
         img{
            height :13rem;
         }
         h1{
            font-size:2rem;
         }
         span{
            display: flex;
            align-items: center;
            
        }
        h3{
            padding-top: 1rem;
        }
        
       }

       @media screen and (min-width :379px)  and  (max-width:720px)  {
         img{
            height :17rem;
         }
         h1{
            font-size:3rem;
         }
         span{
            display: flex;
            align-items: center;
            
        }
        h3{
            padding-top: 1rem;
        }
       }
    
`
export default Welcome;