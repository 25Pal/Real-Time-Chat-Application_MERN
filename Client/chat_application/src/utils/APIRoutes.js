// export const host="https://real-time-chat-app-cvb7.onrender.com";
//https://updated-kyi0.onrender.com
// export const host ="http://localhost:5000";

// export const host="https://fullstack-88ek.onrender.com";

export const host=process.env.REACT_APP_BASE_URL;

export const registerRoute = `${host}/auth/register`

export const loginRoute = `${host}/auth/login`

export const setAvatarRoute = `${host}/auth/avatr`

export const updateAvatar = `${host}/auth/updateProfile`

export const allUserRoute = `${host}/auth/allusers`

export const sendMessaegRoute= `${host}/messages/addmsg`;

export const getAllMessagesRoute= `${host}/messages/getmsg`;

