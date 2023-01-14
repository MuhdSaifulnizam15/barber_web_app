import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  customers: [],
  customer: null,
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

    // GET ALL CUSTOMER
    getAllCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customers = action.payload;
    },

    // GET CUSTOMER
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.customer = action.payload;
    },

    // GET CUSTOMER
    getCustomerFailed(state) {
      state.isLoading = false;
      state.customer = null;
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
      dispatch(slice.actions.getAllCustomerSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCustomerByPhoneNo(phone_no) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/customer/check/phone/${phone_no}`);
      console.log('response', response.data);
      dispatch(slice.actions.getCustomerSuccess(response.data.customer));
      return response.customer;
    } catch (error) {
      console.log('error', error)
      dispatch(slice.actions.getCustomerFailed());
      dispatch(slice.actions.hasError(error));
    }
  };
}