import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    email: "",
    profile_pic: "",
    tokken: ""
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
        }
    }
});

export const { setUser, logout } = userSlice.actions; // Corrected the action name here
export default userSlice.reducer;
