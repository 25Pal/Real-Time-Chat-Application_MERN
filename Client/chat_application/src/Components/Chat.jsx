import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { allUserRoute } from '../utils/APIRoutes';
import Contacts from './Contacts';
import axios from "axios";
import Welcome from './Welcome';
import ChatContainer from './ChatContainer';
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes"

function Chat() {

  const socket = useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ If user not Login then will redirect to login ^^^^^^^^^^^^^^^^^^^^^^\\

  useEffect(() => {
   
    const setUser = async function () {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true)
      }
    }
    setUser();
  }, []);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Adding data to Socket.io ^^^^^^^^^^^^^^^^^^^^^^\\

  useEffect(() => {

    if (currentUser) {
      socket.current = io(host,{
        auth:{
          token : currentUser._id 
        }
      });
      socket.current.emit("add-user", currentUser._id); //++++++ Created custom event ++++++\\
    }
  }, [currentUser]); 

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Getting list of users from backend  ^^^^^^^^^^^^^^^^^^^^^^\\

  useEffect(() => {
   
    const getContact = async function () {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);

        } else {
          navigate("/avatar")
        }
      }
    }
    getContact();
  }, [currentUser]);

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Setting state value of current-chat  ^^^^^^^^^^^^^^^^^^^^^^\\

  const handleChatChange = (chat) => {
   
    setCurrentChat(chat);
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Main part ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

  return (
    <Container>
      
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {

          isLoaded &&
            currentChat === undefined ?
            (<Welcome currentUser={currentUser} />) :
            (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />)

        }

      </div>
    </Container>
  )
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ CSS Part  ^^^^^^^^^^^^^^^^^^^^^^\\

const Container = styled.div`
/* border:1px solid red; */

       height :100vh;
      width :100wh;
      display:flex;
      flex-direction: column; 
      justify-content: center;
      gap:1rem;
      align-items: center;
      background-color: #131334;

      .container{
    
        box-sizing: border-box;
        height :85vh;
        width:85vw;
        background-color:#00000076;
        display: grid;
        grid-template-columns: 25% 75%;

      
        @media screen and (min-width :720px) and (max-width:1080px){    //^^^ Making it responsive for tablate mode ^^^\\
          
          grid-template-columns: 35% 65%;
        }

        @media screen and (min-width :379px)  and  (max-width:720px) {  //^^^ For phone will make it responsive as below ^^^\\
          grid-template-columns: 30% 70% ; 
          height :97vh;
          width:100vw;  
        } 

        @media screen and (min-width :100px) and (max-width:379px)  {
         
          grid-template-columns: 40% 60% ;
          height :100vh;
          width:100vw;
          border: 0.5px solid blueviolet;
          
        }  
      }

       
`
export default Chat ;