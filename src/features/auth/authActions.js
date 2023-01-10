import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const backendURL = "http://localhost:3001/api/v1";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { first_name, last_name, email, password, role = "staff" },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${backendURL}/auth/register`,
        { first_name, last_name, email, password, role },
        config
      );
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${backendURL}/auth/login`,
        { email, password },
        config
      );
      console.log("data", data);
      if (typeof window !== "undefined") {
        // store user's token in local storage
        localStorage.setItem("userToken", JSON.stringify(data.tokens));
        localStorage.setItem("userInfo", JSON.stringify(data.user));
      }
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "auth/profile",
  async ({}, { rejectWithValue }) => {
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
      };
      const { data } = await axios.get(
        `${backendURL}/auth/profile`,
        config
      );
      // store user's token in local storage
      localStorage.setItem("userInfo", JSON.stringify(data.user));

      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);