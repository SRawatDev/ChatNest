import axios from "axios";
import  {baseUrl}  from "../config/config";

const axiosInt = async (method, endpoint, data, headers) => {
  try {
    const response = await axios({
      method,
      url: baseUrl.localUrl  + endpoint,
      data,
      headers,
    });
    return response;
  } catch (error) {
    throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
  }
};

export default axiosInt;
