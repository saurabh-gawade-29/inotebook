import axios from "axios";
import { trackPromise } from "react-promise-tracker";

//TODO: Change this host as per your needs
const host = "https://inotebookbackend-ec2h.onrender.com/";

//? POST
export async function serviceCallPost(url, postData, headers) {
  debugger;
  // TODO: Global Function Pending
  try {
    //! Need to pass headers in object
    const response = await trackPromise(
      axios.post(`${host}${url}`, postData, { headers })
    );
    return response;
  } catch (error) {
    console.log(error, "ServiceCall Catch Block");
  }
}

//? PUT
export async function serviceCallPut(url, postData, headers) {
  debugger;
  // TODO: Global Function Pending
  try {
    //! Need to pass headers in object
    const response = await trackPromise(
      axios.put(`${host}${url}`, postData, { headers })
    );
    return response;
  } catch (error) {
    console.log(error, "ServiceCall Catch Block");
  }
}

//? GET
export async function serviceCallGet(url, headers) {
  debugger;
  try {
    //! Need to pass headers in object
    const response = await trackPromise(
      axios.get(`${host}${url}`, { headers })
    );
    console.log(response, "Response from service call");
    return response;
  } catch (error) {
    console.log(error, "ServiceCall Catch Block");
  }
}

//? DELETE
export async function serviceCallDelete(url, headers) {
  debugger;
  try {
    //! Need to pass headers in object
    const response = await trackPromise(
      axios.delete(`${host}${url}`, { headers })
    );
    console.log(response, "Response from service call");
    return response;
  } catch (error) {
    console.log(error, "ServiceCall Catch Block");
  }
}

export async function serviceCallFetchGet(url) {
  try {
    const response = await trackPromise(
      //! See here header are in another this bracket {}
      await fetch(`${host}${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
    );
    return response;
  } catch (error) {
    console.log(error, "ServiceCall Catch Block");
  }
}
