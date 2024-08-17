import axios from "axios";
import  {baseUrl}  from "../config/config";

const axiosInt = async (method, endpoint, data, { headers, params }) => {
  try {
    const response = await axios({
      method,
      url: baseUrl.localUrl + endpoint,
      data,
      headers,
      params,  // Ensure params are included for GET requests
    });
    return response;
  } catch (error) {
    throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
  }
};


export default axiosInt;
