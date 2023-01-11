import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  customer: [],
};

const slice = createSlice({
  name: "customer",
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

    // GET BRANCH
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllCustomer() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/customer");
      console.log('response', response.data);
      dispatch(slice.actions.getCustomerSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
