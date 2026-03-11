import axios from "axios";

export function httpErrorHandler(error: any) {
  if (error === null) throw new Error("Unrecoverable error!! Error is null!");
  if (axios.isAxiosError(error)) {
    const response = error?.response;
    const request = error?.request;
    if (error.code === "ERR_NETWORK") {
      console.error("Connection problems");
    } else if (error.code === "ERR_CANCELED") {
      console.error("Connection canceled");
    }
    if (response) {
      const statusCode = response.status;
      if (statusCode === 404) {
        console.error(
          "The requested resource does not exist or has been deleted"
        );
      } else if (statusCode === 401) {
        console.error("Please login to access this resource");
      } else if (statusCode === 400) {
      } else {
      }
    } else if (request) {
      console.error("No response from server");
    }
  } else {
    console.error(error.data);
  }
}
