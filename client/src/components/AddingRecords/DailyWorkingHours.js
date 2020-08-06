import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PostDWHoursAction from "../../store/action/AddingRecordsAction/DWHoursAction/AddingDWHoursAction";
import clearErrorsAction from "../../store/action/ErrorActions/ClearErrorsAction";
import FetchAllDWHoursAction from "../../store/action/AddingRecordsAction/DWHoursAction/FetchAllDWHoursAction";

const Login = (props) => {
  const [dailyWorkingHours, setDailyWorkingHours] = useState("");

  const handleChangeDailyWorkingHours = (e) =>
    setDailyWorkingHours(e.target.value);

  useEffect(() => {
    props.clrErrrorsActionAsProps();
    props.fetchDWHoursActionAsProps();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (dailyWorkingHours) {
      if (isNaN(dailyWorkingHours) === false) {
        if (props.dwHoursProps.length === 0) {
          //new user object.
          const newObject = {
            dailyWorkingHours,
          };
          props.addDWHoursActionAsProps(newObject);
          setDailyWorkingHours("");

          toast.success("You Added DailyWorkingHours Successfully.");
        } else {
          toast.error("Sorry You Already Added Daily Working Hours");
        }
      } else {
        toast.error("Sorry Daily Working Hours must be a number");
      }
    } else {
      toast.error("Please fill all fields");
    }
  };
  if (!props.isAuthenticatedAsProps) {
    return <Redirect to="/" />;
  }
  return (
    <div className="limiter">
      <ToastContainer />
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
          <form className="login100-form validate-form" onSubmit={handleSubmit}>
            <span className="login100-form-title p-b-49">
              Adding Daily Working Hourse
            </span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Daily Working Hourse</span>
              <input
                className="input100"
                type="text"
                name="dailyWorkingHourse"
                value={dailyWorkingHours}
                placeholder="Type Daily Working Hourse"
                onChange={handleChangeDailyWorkingHours}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">
                  Add DailyWorkingHourse
                </button>
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
  dwHoursProps: state.recordsReducer.dWHoursList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addDWHoursActionAsProps: (data) => {
      dispatch(PostDWHoursAction(data));
    },
    fetchDWHoursActionAsProps: () => {
      dispatch(FetchAllDWHoursAction());
    },
    clrErrrorsActionAsProps: () => {
      dispatch(clearErrorsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
