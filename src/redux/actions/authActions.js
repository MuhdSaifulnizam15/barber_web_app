import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    userAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      })
    },
    userToggled(state, action) {
      const user = state.find((user) => user.id === action.payload)
      user.completed = !user.completed
    },
  },
})

export const { userAdded, userToggled } = usersSlice.actions
export default usersSlice.reducer
