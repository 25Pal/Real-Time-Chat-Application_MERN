import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import LogOut from '../Components/LogOut';
import ChatInput from "../Components/ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';

import { getAllMessagesRoute, sendMessaegRoute } from '../utils/APIRoutes';

import "react-toastify/dist/ReactToastify.css";

function ChatContainer({ currentChat, currentUser, socket }) {

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const scrollRef = useRef();

    useEffect(() => {

        async function changeChat() {
            if (currentChat) {
                const response = await axios.post(getAllMessagesRoute, {
                    from: currentUser._id,
                    to: currentChat._id
                });
                setMessages(response.data)

            }


        }
        changeChat();
    }, [currentChat])

    const handleSendMsg = async (msg) => {

        await axios.post(sendMessaegRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,

        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };


    useEffect(() => {

        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg })
            })
        };
    }, []);

    useEffect(() => {

        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);

    }, [arrivalMessage]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    return (
        <>
            {
                currentChat && (
                    < Container >
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avtar" >
                                    <img
                                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                                        alt="avatar"
                                    />

                                </div>
                                <div className="username">
                                    <h3>{currentChat.username}</h3>

                                </div>
                            </div>

                            <LogOut />

                        </div>
                        <div className="chat-messsages">
                            {
                                messages.map((message) => {
                                    return (

                                        <div ref={scrollRef} key={uuidv4()}>
                                            <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                                <div className="content">
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )

                                })
                            }
                        </div>

                        <ChatInput handleSendMsg={handleSendMsg} />
                    </Container >
                )

            }


        </>


    )
}


const Container = styled.div`

    padding-top: 0.5rem;
    display:grid;
    grid-template-rows:10% 78% 12% ;
    gap:0.1rem;
    overflow:hidden;
    @media screen and (min-width :720px) and (max-width:1080px){
            grid-template-rows: 15% 70% 15%;
            }
    .chat-header{

        background-color: #080428;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
            .user-details{
                display:flex;
                align-items: center;
                gap:1rem;
                .avtar {
                    img{
                        
                        height:5rem
                    }

                }
            }

            .username{
                h3{
                    color: white;
                }
            }
    }

.chat-messsages{
        padding:1rem 2rem;
        display: flex;
        flex-direction: column;
        gap:1rem;
        overflow: auto;
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color: #ffffff39;
                width:0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content{
                max-width:40%;
                overflow-wrap: break-word;
                padding: 1rem;
                font-size: 1.1rem;
                border-radius: 1rem;
                color:#d1d1d1;
            }
        }
        .sended{
            justify-content:flex-end ;
            .content{
                background-color: #4f04ff21;
            }
        }
        .recieved{
            justify-content: flex-start;
            .content{
                background-color:#9900ff20 ;
            }  
        }
}
 
@media screen and (min-width :379px)  and  (max-width:720px){
    grid-template-rows: 10% 80% 10%;
    .chat-header{
        padding: 0.5rem;
            .user-details{
                 gap:0.5rem;
                    .avtar {
                        img{
                             height:4rem
                        }

                    }
            }
            .username{
                h3{
                    font-size: 1rem;
                    color: white;
                }
            }
        
    }
    .chat-messsages{
        padding:1rem 0.2rem;
        gap:1rem;
        .message{
            .content{
                    max-width:90%;
                    padding: 0.4rem;
                    font-size: 0.9rem;
                }
        }  
    }
}

@media screen and (min-width :100px) and (max-width:379px){
    grid-template-rows: 11% 78% 11%;
    .chat-header{
        padding: 0.5rem;
        .user-details{
                gap:0.3rem;
                .avtar {
                    img{
                        height:4rem;
                    }
                }
        }
        .username{
            h3{
                font-size: 1.2rem;
                color: white;
            }
        }
        
    }
    .chat-messsages{
    
        padding:1rem 0.2rem;
        gap:1rem;
        .message{
            .content{
                    max-width:90%;
                    padding: 0.4rem;
                    font-size: 0.7rem;
                }
        }  
    }
    
}
`
export default ChatContainer;