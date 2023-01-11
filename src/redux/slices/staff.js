import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  staff: [],
};

const slice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET STAFF
    getStaffSuccess(state, action) {
      state.isLoading = false;
      state.staff = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllStaff() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/staff");
      console.log('response', response.data);
      dispatch(slice.actions.getStaffSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
