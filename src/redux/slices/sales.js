import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  sales: [],
};

const slice = createSlice({
  name: "sales",
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

    // GET SALES
    getSalesSuccess(state, action) {
      state.isLoading = false;
      state.sales = action.payload;
    },

    // ADD SALES
    addSalesSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllSales() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get("/sales");
      console.log('response', response.data);
      dispatch(slice.actions.getSalesSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addSales(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post("/sales", data);
      console.log('response', response.data);
      dispatch(slice.actions.addSalesSuccess(response.data.sale));
    } catch (error) {
      console.log(error)
      dispatch(slice.actions.hasError(error));
    }
  };
}