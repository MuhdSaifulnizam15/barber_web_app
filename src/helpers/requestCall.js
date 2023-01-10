import axios from "axios";
import config from "../constants/config";

export default function RequestCall() {
  const header = (file = false) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (file) {
      headers["Content-Type"] = "multipart/form-data";
    }

    return headers;
  };

  const requestCall = (
    endPoint,
    method,
    data = null,
    query = null,
    isFile = false
  ) => {
    const apiUrl = config.apiUrl;
    const url = apiUrl + encodeURI(endPoint);
    const token = "Bearer " + JSON.parse(localStorage.getItem("token"));

    console.log(url);

    var configs = {
      headers: header(isFile),
    };

    // check if there is query param
    if (query) {
      configs.params = query;
    }
    
    // TODO: check if token expired, auto refresh token (feature)

    // if token exist, apply for authorization
    if (token) {
      configs.headers["Authorization"] = "Basic " + token;
    }

    switch (method) {
      case "GET":
        return axios.get(url, configs);
      case "POST":
        return axios.post(url, data, configs);
    }
  };
}
