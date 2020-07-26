import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import registerUserAction from "../../store/action/UserAuthActions/RegisterUserAction";
import clearErrorsAction from "../../store/action/ErrorActions/ClearErrorsAction";

const Register = (props) => {
  console.log(props.errorAsProps.msg);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState(null);

  const handleChangeName = (e) => setName(e.target.value);
  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangePassword2 = (e) => setPassword2(e.target.value);

  useEffect(() => {
    props.clrErrrorsActionAsProps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password) {
      if (password === password2) {
        //new user object.
        const newUser = {
          name,
          email,
          password,
        };

        // Add user via regUserActionAsProps
        props.regUserActionAsProps(newUser);

        toast.success(props.errorAsProps.msg.message);
      } else {
        toast.error("Passwords don't matches");
      }
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
            <span className="login100-form-title p-b-49">Sign Up</span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Type your username"
                onChange={handleChangeName}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

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
                name="password1"
                placeholder="Type your password"
                onChange={handleChangePassword}
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100 ">ReEnter-Password</span>
              <input
                className="input100"
                type="password"
                name="password2"
                placeholder="Type again password"
                onChange={handleChangePassword2}
              />
              <span className="focus-input100" data-symbol="&#xf190;"></span>
            </div>

            <div className="text-right p-t-8 p-b-31">
              <a href="#">Forgot password?</a>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Sign Up</button>
              </div>
            </div>

            <div className="txt1 text-center p-t-54 p-b-20">
              <span>Or Sign Up Using</span>
            </div>

            <div className="flex-c-m">
              <a href="#" className="login100-social-item bg1">
                <i className="fa fa-facebook"></i>
              </a>

              <a href="#" className="login100-social-item bg2">
                <i className="fa fa-twitter"></i>
              </a>

              <a href="#" className="login100-social-item bg3">
                <i className="fa fa-google"></i>
              </a>
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
    regUserActionAsProps: (data) => {
      dispatch(registerUserAction(data));
    },
    clrErrrorsActionAsProps: () => {
      dispatch(clearErrorsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
