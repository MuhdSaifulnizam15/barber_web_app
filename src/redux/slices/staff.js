import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// utils
import axios from 'utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  staff: [],
  staff_info: {},
  currPage: 0,
  pagingCounter: 0,
  totalPages: 0,
  totalDocs: 0,
  limit: 10,
  hasPrevPage: false,
  hasNextPage: true,
  prevPage: null,
  nextPage: null,
};

const slice = createSlice({
  name: 'staff',
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

    // GET ALL STAFF
    getStaffSuccess(state, action) {
      state.isLoading = false;
      state.staff = action.payload;
      state.currPage = action.payload?.page;
      state.totalDocs = action.payload?.totalDocs;
      state.pagingCounter = action.payload?.pagingCounter;
      state.hasPrevPage = action.payload?.hasPrevPage;
      state.hasNextPage = action.payload?.hasNextPage;
      state.prevPage = action.payload?.prevPage;
      state.nextPage = action.payload?.nextPage;
      state.totalPages = action.payload?.totalPages;
    },

    // GET ALL STAFF
    getStaffInfoSuccess(state, action) {
      state.isLoading = false;
      state.staff_info = action.payload;
    },

    // ADD STAFF
    addStaffSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE STAFF
    deleteStaffSuccess(state, action) {
      state.isLoading = false;
    },

    // UPDATE STAFF
    updateStaffSuccess(state, action) {
      state.isLoading = false;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions

// ----------------------------------------------------------------------

export function getAllStaff({ page = 1, limit = 10 }) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/staff?page=${page}&limit=${limit}`);
      console.log('response', response.data);
      dispatch(slice.actions.getStaffSuccess(response.data.result));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getStaffById(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/staff/user/${id}`);
      console.log('response', response.data);
      dispatch(slice.actions.getStaffInfoSuccess(response.data.staff));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addStaff(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/staff', data);
      console.log('response', response.data);
      dispatch(slice.actions.addStaffSuccess(response.data.staff));

      toast.success('Staff successfully added', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteStaff(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/staff/delete/${id}`);
      console.log('response', response.data);
      dispatch(slice.actions.deleteStaffSuccess(response.data));

      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateStaff(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/staff/update/${id}`, data);
      console.log('response', response.data);
      dispatch(slice.actions.updateStaffSuccess(response.data));

      toast.success('Staff successfully updated', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
