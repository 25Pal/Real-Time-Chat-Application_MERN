//============================================ Packages  =========================================\\

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loader from "../assets/loader.gif"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios, { AxiosError } from "axios"
import { setAvatarRoute } from '../utils/APIRoutes';
import { Buffer } from "buffer";

//============================================ Working Part =========================================\\

function SetAvatar() {

    const api = "https://api.dicebear.com/6.x/adventurer/svg?seed="
    // https://api.dicebear.com/6.x/adventurer/svg?seed=Ginger&flip=true

    const navigate = useNavigate();

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);



    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Throw Error ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\
    const toastOptions = {
        position: "bottom-right",
        ResizeObserverSize: "small",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Incase user is not Login ^^^^^^^^^^^^^^^^^^^^^^^^\\
    useEffect(() => {
        async function redirect() {
            if (!localStorage.getItem("chat-app-user")) {

                navigate("/login");
            }
        }
        redirect();

    })


    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Setting User Avatar (Button) ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

    const setProfilePicture = async () => {

        if (selectedAvatar === undefined) {
            toast.error("Please select an Avatar...", toastOptions)
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));

            const { data } = await axios.post(`${setAvatarRoute}/${user._id} `,
                {
                    image: avatars[selectedAvatar]

                });

            if (data.isSet) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/')
            } else {

                alert("Click again to set Avatar !");
            }


        }
    }
    

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Fetching avatar from api ^^^^^^^^^^^^^^^^^^^^^^^^\\

    useEffect(() => {
        async function fetchData() {

            const localData = await JSON.parse(localStorage.getItem("chat-app-user"));

            let name = localData.username;

            const Data = [];

            for (let i = 0; i < 6; i++) {
                let number = Math.round(Math.random() * 10000);
                
                const image = await axios.get(`${api}${name + number}&flip=true`);

                const buffer = new Buffer(image.data);
                Data.push(buffer.toString("base64"));  //****** Converting Buffer data to base64 string(SVG format) ******\\
            }
            setAvatars(Data);
            setIsLoading(false);
        }
// "https://api.dicebear.com/6.x/adventurer/svg?seed=
    // https://api.dicebear.com/6.x/adventurer/svg?seed=Ginger&flip=true


        fetchData();
    }, []);

    return (
        <>

            {
                isLoading ? <Container> <img src={loader} alt="loder" className='loader' /></Container> : 
                (
                    <Container>
                        <div className='title-container'>
                            <h1>Pick an avatar as your profile picture...</h1>

                        </div>
                        <div className="avatars">
                            {
                                avatars.map((avatar, index) => {
                                  
                                    return (
                                        <div
                                            key={index}
                                            className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>

                                            <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar"   //^^^^ Fixed url to use base64 decoded string as an src link ^^^\\
                                                onClick={() => setSelectedAvatar(index)}
                                            />
                                        </div>
                                    )

                                })
                            }


                        </div>
                        <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>

                    </Container>
                )
            }
            <ToastContainer />

        </>
    )
}

const Container = styled.div`
    display :flex;
    justify-content: center;
    align-items:center;
    flex-direction: column;
    gap:3rem;
    background-color: #04042c;
    height :100vh;
    width :100vw;
    .loader{
        max-inline-size: 100%;
    }
    .title-container{
        h1{
            color:white;
        }
    }
    .avatars{
        display:flex;
        gap:1rem;

        .avatar{
            border:0.4rem solid transparent;
            padding:0.8rem;
            border-radius: 10rem;
            display:flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img{
                height:10rem ;
            }
        }
        .selected{
            border:0.4rem solid #4e0eff
        }
        
    }
    .submit-btn{
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
@media screen and (min-width :720px) and (max-width:1080px){
    .avatars{
        display:flex;
        gap:0.1rem;

        .avatar{
            border:0.4rem solid transparent;
            padding:0.9rem;
            border-radius: 200%;
            display:flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img{
                padding:0px;
                width:100%;
                height:auto ;
            }
        }
        .selected{
            border:0.4rem solid #4e0eff
        }
        
    }

         
    }

@media screen and (min-width :379px)  and  (max-width:720px){

    .title-container{
        h1{
            padding-left: 50px;
            color:white;
        }
    }
    .avatars{
        display:flex;
        gap:0rem;

        .avatar{
            border:0.1rem solid transparent;
            padding:0rem;
            border-radius: none;
            display:flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img{
                padding:0px;
                width:100%;
                height:auto;
            }
        }
        .selected{
            border:0.2rem solid #4e0eff
        }
        
    }

    }

@media screen and (min-width :100px) and (max-width:379px){
   
    .title-container{
        h1{
            padding-left: 50px;
            color:white;
        }
    }
    .avatars{
        display:flex;
        gap:0rem;

        .avatar{
            border:0.1rem solid transparent;
            padding:0rem;
            border-radius: none;
            display:flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s ease-in-out;

            img{
                padding:0px;
                width:100%;
                height:auto;
            }
        }
        .selected{
          
            border:0.2rem solid #4e0eff
            
        }
        
    }
}

`
export default SetAvatar;