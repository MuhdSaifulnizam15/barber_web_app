import { map, filter } from "lodash";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// utils
import axios from "utils/axios";

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  transaction: [],
};

const slice = createSlice({
  name: "transaction",
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

    // GET TOTAL SALES CHART DATA
    getTotalSalesSuccess(state, action) {
      state.isLoading = false;
      state.transaction = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getTotalSalesChart(type) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/sales/chart/${type}`);
      console.log("response", response.data);
      dispatch(slice.actions.getTotalSalesSuccess(response.data.chart));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
