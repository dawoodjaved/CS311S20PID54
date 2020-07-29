import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import logInUserAction from "../../store/action/UserAuthActions/LoginUserAction";
import clearErrorsAction from "../../store/action/ErrorActions/ClearErrorsAction";

const Login = (props) => {
  useEffect(() => {
    props.clrErrrorsActionAsProps();
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      //new user object.
      const user = {
        email,
        password,
      };

      // Add user via loginUserActionAsProps
      props.logInUserActionAsProps(user);
      toast.success("hello you succeeded");
    } else {
      toast.error("Please fill all fields");
    }
  };
  if (props.isAuthenticatedAsProps) {
    return <Redirect to="/" />;
  }
  return (
    <div className="limiter">
      <ToastContainer />
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-49">Login</span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Email</span>
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Type your email"
                onChange={handleChangeEmail}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="pass"
                placeholder="Type your password"
                onChange={handleChangePassword}
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div className="text-right p-t-8 p-b-31">
              <a href="#">Forgot password?</a>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticatedAsProps: state.userAuthReducer.isAuthenticated,
  errorAsProps: state.errorReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logInUserActionAsProps: (data) => {
      dispatch(logInUserAction(data));
    },
    clrErrrorsActionAsProps: () => {
      dispatch(clearErrorsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
