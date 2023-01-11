import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  branch: [],
};

const slice = createSlice({
  name: "branch",
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
    getBranchSuccess(state, action) {
      state.isLoading = false;
      state.branch = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllBranch() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/branches");
      console.log('response', response.data);
      dispatch(slice.actions.getBranchSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
