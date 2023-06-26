# Quick Chat Application

Quick Chat app is a real time chat application .It is MERN project . It includes react.js , node.js , mongoDB , express and some more tech stack. It provides functionality like What's app ,Instagram etc. 
Through this application users can able to talk with each other at the same time and also multiple users can talk at the same time . Users can set avtar of their choice and this app provides functionality of logout so that user can able to logout and login any time.


                             


## Deployment
![App Screenshot](https://inspiring-marigold-366938.netlify.app/)

#### To start backend server
- Go inside src folder .

```bash
    npm i 
    npx nodemon index.js  or npm index.js
```
#### To start frontend server
- Go inside Client -> chat_application .

```bash
  npm start 
```
## Backend part includes ->
- User Controller
- Message Controller
- Index.js ->(Main file)

### Models
- UserModel
```bash
  username:{
        type:String,
        required:true,
        min:4,
        max:20,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    userpassword:{
        type:String,
        required:true,
        min:8,
        trim:true

    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
```

- MessageModel
```bash
message: {
        text: {
            type: String,
            required: true
        },
    },
    users: Array,
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
```


- User Controller
- Message Controller
- Index.js ->(Main file)
                             


## Backend Logic

### User Controller  
#### Post/register
  - Create a user by taking data from a request body .
  - Email and username should be unique .
  - Get username,userpassword , email  in request body  only.
  - Make sure all the fields are valid .
  - The response should be a JSON object   
       {    status:true , msg:"User created !" } .
  - On failer response should be a JSON object   
       {    status:false , msg:"" } .


#### Post/login
  - Login a user by taking data from a request body .
  - Check whether email is exists or not .
  - Get username,userpassword in request body only.
  - Make sure password is correct .
  - The response should be a JSON object   
       {    status:true , msg:"User created !" } .
  - On failer response should be a JSON object   
       {    status:false , msg:"" } .
  
#### Post/avatr/:id
  - User need to login first.
  - Take user_id in the params.
  - Check whether user exists or not .
  - Update user data .
  - The response should be a JSON object   
       {    isSet: true/false , image: link from the DB} .
  - On failer response should be a JSON object   
       {    status:false , msg:"" } .

#### get/allusers/:id
  - Take user_id in the params.
  - Check whether user exists or not .
  - Take all users list except current user .
  - The response should be a JSON object   
       { objdata } .
  - On failer response should be a JSON object   
       {    status:false , msg:"" } .

### Message Controller 
#### Post/addmsg/
- First, from frontend side will take  (from ,to , message) data.
- In from=>Current user id should be prensent.
- In to => Reciever's id should be present .
- In message => msg will be present in string format .
- Create message data and store it in DB .
- The response should be a JSON object   
       { status: true, msg: "Message Recieved!" } .
- On failer response should be a JSON object   
       {    status:false , msg:"" } .

#### Post/getmsg/
- In request body take data through (from , to).
- In from=>Current user id should be prensent.
- In to => Reciever's id should be present .
- Take all messages and store it inside an array , array must sorted according to time .
- The response should be a JSON object   
       { Array Object } .
- On failer response should be a JSON object   
       {    status:false , msg:"" } .

### Socket.io Connection
```bash
    Inside  index.js
```


## Frontend part includes ->

- All the logic inside "src" folder
- App.js ->(Main file) 

## Frontend Logic

### Regiter.jsx
- I have used style components for styling .          
      <Section>
            Registration logic
      <Section/>






![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/register.png?raw=true)

### Login.jsx
- I have used style components for styling .  
      <Section>  login Logic <Section/>
- It has same property as registration page .

![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/login.png?raw=true)

### Chat.jsx
- I have used style components for styling .  
      <Container> Chat Logic <Container/>
- Once user login /Register ,He will automatically  redirected to the chat page .
- From chat page they will automatically redirected to our "/avatar" page .
- And again after setting user avatar they will redirect to the "Contact.jsx" and then User will first time redirect to "Welcome.jsx" and second time they will redirect to the "ChatContaine.jsx".
- Chat.jsx look as below .
![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/mainChat%20page.png?raw=true)

### setAvatar.jsx
- In this im setting an user avatar by using "https://www.dicebear.com/" this free avatar api .
- setAvatar page will look like this 
![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/avtar.png?raw=true)

### contacts.jsx
- Here I'm getting list of all present user from the backend and simply listinf all the users at the left side like What's app .
- In this page we have 3 parts first component for "Logo & heading" then i have contacts component and after that i have current user component at the bottom of this page .
-  Contacts page will look like this 
![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/contact.png?raw=true)

### Welcome.jsx
- This page will be shown first time when user enter in our chat page .
- Once user select any other user for chatting it will automatically disappear . and user will redirect to the ChatContainer component .
- You can have a look on Welcome page .

![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/welcome.png?raw=true)

### ChatContainer.jsx
- Once user select any chat this ChatContainer will perform his functionality . 
- It has Three container   
   1.Header-: Which will show name and avtar of another user . Inside this we have Logout.jsx .It is at the top of the ChatContainer.
   2.Messages-: Here all the previous and current chat will appear . It is in middel of the ChatContainer .  
   3.Input-: From this container user will send the message to the reciever .It is at the bottom of this ChatContainer . Its functionality has been performed inside the "chatInput.jsx" file.
- You can have a look on a ChatContainer page.

![App Screenshot](https://github.com/25Pal/Real-Time-Chat-Application_MERN/blob/main/Client/chat_application/src/ScreenShots/chatpage.png?raw=true)




