import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   name: "",
   avatar: "" 
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
    }
  }
})

// Action creators are generated for each case reducer function
export const { setName,setAvatar } = activateSlice.actions

export default activateSlice.reducer