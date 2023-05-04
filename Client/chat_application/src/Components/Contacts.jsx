import React, { useState, useEffect,useRef } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.svg';
import {updateAvatar} from '../utils/APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
// import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";
import { host } from "../utils/APIRoutes";

function Contacts({ contacts, currentUser, changeChat }) {

    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [status , setStatus]= useState("false");

    const socket = useRef();
//^^^^^^^^^^^^^^^^^^^^^^^^ Setting data after all operation done(At the end) ^^^^^^^^^^^^^^^^^^^^\\
    useEffect(() => {

        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }

    }, [currentUser]);

//^^^^^^^^^^^^^^^^^^^ Socket connection ^^^^^^^^^^^^^^^^^^^^\\

useEffect(() => {

    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("onlinestatus", currentUser._id); //++++++ Created custom event ++++++\\
    }
  }, [currentUser]);


//^^^^^^^^^^^^^^^^^^^^^^^^ Whenever we click on any user  ^^^^^^^^^^^^^^^^^^^^\\
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

//^^^^^^^^^^^^^^^^^^^^^^^ Show Onine user ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
useEffect( ()=>{
    const show = async ()=>{
       socket.on("getOnlineUser",(data)=>{
        setStatus("true");
            
       })
    }
    show();
},[status])
//^^^^^^^^^^^^^^^^^^^^^^^^ Update Profile ^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
const toastOptions = {
    position: "bottom-right",
    ResizeObserverSize: "small",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
};
const navigate= useNavigate();

const updateAvatarOfUser = async ()=>{
    const user = await JSON.parse(localStorage.getItem("chat-app-user")); // Here will get current user from LocalStorage
  
  
   let changeStatus = await axios.post(`${updateAvatar}/${user._id}`);  // From backend also we are removing image data
  
   if(changeStatus.data.isSetAvatar===false){
    user.isAvatarImageSet = false;                          //Here we are updating local Storage data 
    user.avatarImage = undefined;
    localStorage.setItem("chat-app-user", JSON.stringify(user)); // Seting new data in LocalStorage 

    navigate("/avatar");
   }else{
    toast.error("Data not fetched...", toastOptions)
   }
}
    return (
        <>
          
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className='brand'>
                            <img src={logo} alt="logo" />
                            <h3>Quick Chat</h3>
                        </div>
                        <div className='contacts'>
                      
                            {
                                contacts.map((contacts, index) => {
                                    return (
                                       
                                        <div className={`contact ${index === currentSelected ? "selected" : ""} `}
                                            
                                            key={index} onClick={() => changeCurrentChat(index, contacts)} >
                                            
                                            <div className="avatar">
                                           
                                                <img
                                                    src={`data:image/svg+xml;base64,${contacts.avatarImage}`} alt="avatar"

                                                />
                                            </div>
                                            <div className='username'>
                                                <h3>{contacts.username}</h3>

                                            </div>
                                            {/* <div className={`showbox${contacts.Online ?"true":"" }`} key={index} ></div> */}
                                          
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar" onClick={updateAvatarOfUser}>
                            
                                <img  
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className='username'>
                                <h2>{currentUserName}</h2>
                            </div>

                        </div>
                    </Container>
                )}

        </>
    );
}

//^^^^^^^^^^^^^^^^^^^^^^^^ Design part ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const Container = styled.div`
    
    box-sizing: border-box;
    display:grid;
    grid-template-rows: 10% 76% 14%;
    overflow: hidden;
    background-color:#080420;
    .searchbar{
        border:red 1px solid;
        width: 100%;
        height: 3rem;
        
    }
    .brand{
        display:flex;
        align-items:center;
        justify-content: center ;
        gap:1rem;
        img{
            height :2rem;
        }
        h3{
            color:white;
            text-transform:uppercase;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        align-items: center;
        overflow: auto;
        gap:0.8rem;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb {
                background-color: #ffffff39;
                width :0.1rem;
                border-radius: 1rem;
            }
        }

        .contact{
            background-color:#ffffff39;
            min-height: 5rem;
            width:90%;
            cursor: pointer;
            border-radius: 0.5rem;
            padding:0.4rem;
            gap: 1.5rem;
            align-items : center;
            display : flex;
            display: grid;
            grid-template-columns:25% 55% 20%;
            transition: 0.5s ease-in-out;
            .avatar{
                img{
                    border-radius: 10rem;
                    background-color: #080420;
                        height :4rem;
                }
            }
            .username {
                h3 {
                    color :white;
                }
            }
            .showboxtrue{
              
               height: 0.5rem;
               width:0.5rem;
               border-radius:1rem;
               background-color:#0b9a33;
               border:1px solid green;
           }
                

            
            
        }
        
        .selected {
            background-color : #9186f3;
        }
    }


    .current-user {
       
        background-color: #080420;
        display : flex;
        justify-content: center;
        align-items: center;
        gap:2rem ;

        .avatar {
            cursor: pointer;
            img{
                &:hover{
                    background-color: #9b88cf;
                }
                border-radius:3rem;
                height :4rem ;
                max-inline-size: 100% ;
            }
        }

        .username {
           h2{
            color: white;
           }
        }


 @media screen and (min-width :720px) and (max-width:1080px){
          gap:0.5rem ;
          .username{
            h2{
                font-size:1rem;
            } 
          }
        }
       
    }
@media screen and (min-width :720px) and (max-width:1490px){
    .contacts{
        .contact{
        grid-template-columns:25% 44% 30%;
    }
    }
}
 
@media screen and (min-width :379px)  and  (max-width:720px){
   
        .current-user{
            padding: 0.3rem;
            gap:0.2rem;
             .username{
              h2{
                 font-size:0.8rem ;
               }
          }
        }

        .contacts{
            &::-webkit-scrollbar{
            height:0.2rem;
            
            }
          
            .contact{
                display: grid;
                grid-template-columns:47% 38% 15%;
            box-sizing: border-box;
            border: 0.6px solid #2f1d90;
            background-color: transparent;
            padding: 0.2rem;
            gap:0.3rem;
            min-height:auto;
            width:95%;
            
            
            .avatar{
                img{
                    height: 3rem;
                }
            }
           .username{
               h3{
                    font-family:Arial, Helvetica, sans-serif;
                   font-size:0.7rem ;
                }
            }

        }
    }
        .brand {
                padding:0rem;
                gap:0.5rem;
                img{
                    height :2.5rem;
                }
                h3{
                    box-sizing:border-box;
                    font-size:0.9rem ;
                }

            }
    } 

@media screen and (min-width :100px) and (max-width:379px) {

    grid-template-rows: 10% 80% 10%;
        .current-user{
          
            padding: 1rem;
            gap:0.1rem;
            .avatar{
            
                width: 100%;
                height: auto;
            }
             .username{
              h2{
                 font-size:0.9rem ;
               }
          }
         
        }
        .contacts{
           
            &::-webkit-scrollbar{
            height:0.2rem;
            }
            
            .contact{

            border: 0.5px solid #2f1d90;
            box-shadow:1px 1px 3px blueviolet;
            background-color: transparent;
            padding: 0rem;
            gap:0.5rem;
            min-height:auto;
            width:100%;
            box-sizing: border-box;
            grid-template-columns:40% 35% 25%;
            .avatar{
                img{
                   
                    height: 3rem;
                }
            }
           .username{
               h3{
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                   font-size:0.7rem ;
                }
            }

        }
    }
        .brand {
                padding:0.1rem;
                gap:0.3rem;
                img{
                    height :2.1rem;
                }
                h3{
                    box-sizing:border-box;
                    font-size:1rem ;
                }

            }
    }
`
export default Contacts;