import React, { useState } from 'react'
import styled from "styled-components";
import Picker from "emoji-picker-react";

import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);

  };

  const handleEmojiClick = (event, emoji) => {
      let message = msg;
      message += emoji.emoji;
      setMsg(message)
  };

  const sendChat = (e) => {

    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  }


  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {

            showEmojiPicker &&

            <Picker onEmojiClick={handleEmojiClick} />

          }
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input type="text" placeholder="Type here.." value={msg} onChange={(e) => setMsg(e.target.value)} />

        <button className='submit'>

          <IoMdSend />
        </button>

      </form>

    </Container>
  )
}

const Container = styled.div`

    display:grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080428;
    padding: 0.2rem;
    padding-bottom: 0.3rem;

    .button-container {
      display:flex;
      align-items: center;
      color:white ;
      gap:1rem;
      .emoji{
        padding-left:0.5rem;
        position: relative;
        svg{
          font-size: 1.5rem ;
          color:#ebf82ffd;
          cursor:pointer;
        }
        .emoji-picker-react{
          position: absolute;
          top: -350px;
          background-color: #080420;
          box-shadow: 0 5px 10px #9a86f3 ;
          border-color:#9a86f3;
          overflow: auto;
          .emoji-scroll-wrapper::-webkit-scrollbar{
            background-color: #080420;
            width:5px;
            &-thumb{
              border-radius: 5px;
              height: 2rem;
              background-color: #aeb2f4;
            }
          }
          .emoji-categories{
            button{
              filter: contrast(0);
            }
          }
          .emoji-search{
            color: #eac5ed;
            background-color: transparent;
            border-color:#9a86f3 ;
          }
          .emoji-group:before{
            background-color: #080420;
          }
          

        }
        
      }
    }

  .input-container{
    
      width :100%;
       border-radius:2rem;
       display:flex;
       align-content:center;
       gap:2rem;
        background-color: #d1bfbf28;  
        input{
          width :90%;
          background-color: transparent;
          color: white;
          border: none;
          padding-left: 1rem;
          font-size:1.1rem;
          &::selection{
            background-color:#9a86f3;
          }
          &:focus{
            outline:none;
          }
        }
        button{
          padding:0.3rem 2rem;
          border-radius: 2rem;
          display:flex ;
          justify-content: center;
          align-items: center;
          background-color: #9a86f3;
          border:none;
          @media screen and (min-width :720px) and (max-width:1080px){
          padding: 0.3rem 1rem;
          svg{
          
            font-size: 1rem;
          }
        }
          svg{
            font-size: 2rem;
            color:white;
          }
        }
  }

@media screen and (min-width :720px) and (max-width:1080px){
  grid-template-columns: 6% 90% 75%;

  .button-container {
    .emoji{
  
      padding: 0px;
    }
  }
}

@media screen and (min-width :379px)  and  (max-width:720px){

  grid-template-columns:10% 90% 0%;
    .button-container {
      .emoji{
        padding: 0px;
      }
    }   
    .input-container{
          width :100%;
          border-radius:1rem;
          gap:3rem;
          background-color: #d1bfbf28;  

            input{
              padding-left: 1rem;
              font-size:1rem;
            }
            button{
              padding:0.1rem 0.1rem;
              background-color: transparent;
              border:none;
              svg{
                font-size: 1.5rem;
                color:#9a86f3;
                height: 2rem;
                
              }
            }
    }
}

@media screen and (min-width :100px) and (max-width:379px){
  padding: 0px;
      .button-container {
          display:flex;
          align-items: flex-end;
          color:white ;
          gap:1rem;
            .emoji{
              padding-left:0rem;
              position: none;
                svg{
                  font-size: none ;
                  color:transparent;
                  cursor:none;
                } 
            }
      }
      .input-container{
          width :100%;
          border-radius:1rem;
          gap:2rem;
          background-color: #d1bfbf28;  

            input{
              width :80%;
              padding-left: 1rem;
              font-size:1rem;
            }
            button{
              padding:0.1rem 0.1rem;
              background-color: transparent;
              border:none;
              svg{
                font-size: 1.5rem;
                color:#9a86f3;
                
              }
            }
     }}

    
    

`
export default ChatInput;