import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    tokken: "",
    onlineUser : [],
    socketConnection:null
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.profile_pic = action.payload.profile_pic;
            state.tokken = action.payload.tokken;
        },
       
        logout: (state) => { 
            state._id = "";
            state.name = "";
            state.email = "";
            state.profile_pic = "";
            state.tokken = "";
        },
        setOnlineUser:(state,action)=>{
            state.onlineUser=action.payload

        },
        setSocketConnection:(state,action)=>{
            state.socketConnection=action.payload
        }
    }
});

export const { setUser, logout ,setOnlineUser,setSocketConnection} = userSlice.actions; // Corrected the action name here
export default userSlice.reducer;
