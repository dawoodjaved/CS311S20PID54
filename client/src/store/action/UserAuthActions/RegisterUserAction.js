import axios from "axios";
import returnErrorsAction from "../ErrorActions/ReturnErrorsAction";
// Register User
export const registerUserAction = ({ name, email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ name, email, password });

  const baseUrl = "http://localhost:4000/";

  axios
    .post(baseUrl + "api/user/register", body, config)
    .then((res) =>
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrorsAction(
          err.response.data,
          err.response.status,
          "REGISTER_FAIL"
        )
      );
      dispatch({
        type: "REGISTER_FAIL",
      });
    });
};
export default registerUserAction;
