import { ErrorMessage, SuccessMessage } from "../helpers/common";
import { apiUrls } from "./apiUrls";
import { API, callAPI } from "./apiUtils";
export const PostImage = async (body) => {
  try {
    const formData = new FormData();
    formData.append("images", body)
    const apiResponse = await API(apiUrls.uploadFiles, {}, "POST", formData);
    if (apiResponse?.data?.status) {
      return apiResponse?.data?.path;
    }
    else {
      ErrorMessage(apiResponse?.data?.message)
    }

  }
  catch (err) {
    ErrorMessage(err?.message)
  }
}


export const callServiceProvidedAPi = async () => {
  try {
    const apiResponse = await callAPI(apiUrls.contentLists, {}, "GET");
    if (apiResponse.data.status) {
      return apiResponse?.data?.data;

    }
    else {
      ErrorMessage(apiResponse.data.message)
    }
  } catch (error) {
    
  }

}

export const StatusHandler = async (url, body) => {
  try {
    const apiResponse = await callAPI(url, {}, 'POST', body)
    if (apiResponse.data.status) {
      SuccessMessage(apiResponse.data.message)
      return true
    } else {
      ErrorMessage(apiResponse.data.message)
      return false
    }
  } catch (error) {
   
    return false
  }
}

export const callToolListAPi = async (data) => {
  try {
    const apiResponse = await callAPI(apiUrls.toolList, {}, "POST", { ids: data });
    if (apiResponse.data.status) {
      return apiResponse?.data?.data;

    }
    else {
      ErrorMessage(apiResponse.data.message)
    }
  } catch (error) {
   
  }

}


export const callHomeAPi = async () => {
  try {
    const apiResponse = await callAPI(apiUrls.homeSlider, {}, "GET");
    if (apiResponse.data.status) {
      return apiResponse?.data?.data;
    }
    else {
      ErrorMessage(apiResponse.data.message)
    }
  } catch (error) {
   
  }

}



