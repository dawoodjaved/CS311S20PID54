import axios from "axios";
import tokenConfig from "../TokenConfig";
const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://rocky-chamber-92397.herokuapp.com/"
    : "http://localhost:4000/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

//making https requests from client side.

//making an object that has a function and that function returns
//another functions, object is due to that it can be accessed
//by access operator(.) and then it is exported.
export default {
  userAuth(url = baseUrl + "api/auth") {
    const getUserUrl = url + "/user";
    const loginUserUrl = url + "/login";

    return {
      fetchLogedInUser: (getState) =>
        axios.get(getUserUrl, tokenConfig(getState)),
      fetchLogedInUserById: (id) => axios.get(getUserUrl + id),
      loginUser: (newRecord) => axios.post(loginUserUrl, newRecord, config),
    };
  },
};
