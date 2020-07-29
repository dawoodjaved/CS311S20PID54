import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCoursesAction from "../../store/action/AddingRecordsAction/CoursesActions/AddingCourseAction";
import clearErrorsAction from "../../store/action/ErrorActions/ClearErrorsAction";
import FetchAllDWHoursAction from "../../store/action/AddingRecordsAction/DWHoursAction/FetchAllDWHoursAction";
import FetchAllCoursesAction from "../../store/action/AddingRecordsAction/CoursesActions/FetchAllCoursesAction";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const AddingCourses = (props) => {
  const [courseName, setCourseName] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [instructorName, setInstructorName] = useState("");

  const handleChangeInstructorName = (e) => setInstructorName(e.target.value);
  const handleChangeCourseName = (e) => setCourseName(e.target.value);
  const handleChangeCreditHours = (e) => setCreditHours(e.target.value);

  useEffect(() => {
    props.fetchCoursesActionAsProps();
    props.fetchDWHoursActionAsProps();
  }, []);

  function sum(input) {
    if (toString.call(input) !== "[object Array]") return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += Number(input[i]);
    }
    return total;
  }

  var totalCreditHours;
  var creditHoursList;
  var DailyWorkingHours;
  var value;
  var checker = 0;
  var numDWHours;
  var coursesList;

  if (props.coursesProps) {
    creditHoursList = props.coursesProps.map((variableWithIndex) => {
      return variableWithIndex.creditHours;
    });
  }

  totalCreditHours = sum(creditHoursList);

  if (props.coursesProps) {
    coursesList = props.coursesProps.map((varia) => {
      return String(varia.courseName);
    });
  }

  //Daily Working Hours:
  if (props.dwHoursProps) {
    DailyWorkingHours = props.dwHoursProps.map((variableWithIndex) => {
      return variableWithIndex.dailyWorkingHours;
    });
  }
  value = Object.values(DailyWorkingHours);
  numDWHours = parseInt(value) * 5;

  var creditHoursChecker = parseInt(totalCreditHours) + parseInt(creditHours);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (var i = 0; i < coursesList.length; i++) {
      if (courseName === coursesList[i]) {
        checker = 1;
      }
    }
    if (courseName && creditHours && instructorName) {
      if (checker === 0) {
        if (creditHoursChecker <= numDWHours) {
          //new user object.
          const newCourse = {
            courseName,
            creditHours,
            instructorName,
          };
          // Add courses via addCoursesActionAsProps
          props.addCoursesActionAsProps(newCourse);
          setCourseName("");
          setInstructorName("");
          setCreditHours("");

          toast.success("You Added A Course Successfully.");
        } else {
          toast.error(
            `Sorry Now You Can Add Only ${
              numDWHours - totalCreditHours
            } More Credit Hours`
          );
        }
      } else {
        checker = 0;
        toast.error("Sorry This Course is Already Present.");
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
            <span className="login100-form-title p-b-49">Adding Course</span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Course Name</span>
              <input
                className="input100"
                type="text"
                name="courseName"
                value={courseName}
                placeholder="Type CourseName"
                onChange={handleChangeCourseName}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Credit Hours</span>
              <input
                className="input100"
                type="text"
                name="creditHours"
                value={creditHours}
                placeholder="Type CreditHours"
                onChange={handleChangeCreditHours}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Instructor Name</span>
              <input
                className="input100"
                type="text"
                name="instructorName"
                value={instructorName}
                placeholder="Type InstructorName"
                onChange={handleChangeInstructorName}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Add Course</button>
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
  coursesProps: state.recordsReducer.coursesList,
  dwHoursProps: state.recordsReducer.dWHoursList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addCoursesActionAsProps: (data) => {
      dispatch(PostCoursesAction(data));
    },
    fetchCoursesActionAsProps: () => {
      dispatch(FetchAllCoursesAction());
    },
    fetchDWHoursActionAsProps: () => {
      dispatch(FetchAllDWHoursAction());
    },
    clrErrrorsActionAsProps: () => {
      dispatch(clearErrorsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingCourses);
