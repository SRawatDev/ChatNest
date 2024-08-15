import axiosInt from "./axiosUtils";

const callAPI = async (
  endpoint,
  params = {},
  method = "get",
  data = null,
  multipart
) => {
  
  const headers = multipart
    ? {
      "Content-Type": "application/json",
    }
    : {
      "Content-Type": "multipart/form-data",
    }

  let response;
  try {
    switch (method.toLowerCase()) {
      case "get":
        response = await axiosInt(method, endpoint, null, { headers, params });
        break;
      case "post":
        response = await axiosInt(method, endpoint, data, { headers });
        break;
      case "put":
        response = await axiosInt(method, endpoint, data, { headers });
        break;
      case "delete":
        response = await axiosInt(method, endpoint, null, { headers, params });
        break;
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
    return response?.data;
  } catch (error) {
    console.error(`API call failed: ${error.message}`);
    throw error;
  }
};

export default callAPI;
