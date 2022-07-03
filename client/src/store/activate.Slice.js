import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   name: "",
   avatar: "",
   username: "" 
}

export const activateSlice  = createSlice({
  name: 'activate',
  initialState,
  reducers: {
    setName: (state,action) => {
      const name = action.payload
      state.name = name;
    },
    setAvatar: (state,action) => {
      const avatar = action.payload;
      state.avatar = avatar
    },
    setUsername: (state,action) => {
      const username = action.payload;
      state.username = username
    }
  }
})

// Action creators are generated for each case reducer function
export const { setName,setAvatar,setUsername } = activateSlice.actions

export default activateSlice.reducer