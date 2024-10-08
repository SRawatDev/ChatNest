import axios from "axios";
import { baseUrl } from "../config/config";
const axiosInt = async (method, endpoint, data = null, { headers = {}, params = {} } = {}) => {
  try {
    const response = await axios({
      method,
      url: baseUrl.productionUrl + endpoint,
      data,
      headers,
      params,
    });
    return response;
  } catch (error) {
    throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
  }
};

export default axiosInt;
