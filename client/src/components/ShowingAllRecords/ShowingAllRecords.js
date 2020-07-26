import React, { useEffect } from "react";
import FetchAllCoursesAction from "../../store/action/AddingRecordsAction/CoursesActions/FetchAllCoursesAction";
import FetchAllRoomsAction from "../../store/action/AddingRecordsAction/RoomsActions/FetchAllRoomsAction";
import FetchAllDWHoursAction from "../../store/action/AddingRecordsAction/DWHoursAction/FetchAllDWHoursAction";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./css/main.css";
import "./css/util.css";

const ShowingAllRecords = (props) => {
  useEffect(() => {
    props.fetchCoursesActionAsProps();
    props.fetchRoomsActionAsProps();
    props.fetchDWHoursActionAsProps();
  }, []);

  var showingCoursesNames;
  var showingCreditHours;
  var showingInstructorsNames;
  var showingRooms;
  var showingDWHours;

  if (props.coursesProps) {
    showingCoursesNames = props.coursesProps.map((variableWithIndex) => {
      return String(variableWithIndex.courseName);
    });
  }
  var showingCoursesList = Object.values(showingCoursesNames);

  if (props.coursesProps) {
    showingCreditHours = props.coursesProps.map((variableWithIndex) => {
      return String(variableWithIndex.creditHours);
    });
  }

  var showingCreditHoursList = Object.values(showingCreditHours);

  if (props.coursesProps) {
    showingInstructorsNames = props.coursesProps.map((variableWithIndex) => {
      return String(variableWithIndex.instructorName);
    });
  }

  var showingInstructorsList = Object.values(showingInstructorsNames);

  if (props.roomsProps) {
    showingRooms = props.roomsProps.map((variableWithIndex) => {
      return String(variableWithIndex.roomNo);
    });
  }

  var showingRoomsList = Object.values(showingRooms);

  if (props.dwHoursProps) {
    showingDWHours = props.dwHoursProps.map((variableWithIndex) => {
      return String(variableWithIndex.dailyWorkingHours);
    });
  }
  var showingDWHList = Object.values(showingDWHours);
  console.log(showingDWHours[0]);
  var runner = -1;
  if (showingCoursesList) {
    var showingAllData = showingCoursesList.map((variableWithIndex) => {
      runner++;
      return (
        <tr className="row100 body">
          <td>{variableWithIndex}</td>
          <td>{showingCreditHoursList[runner]}</td>
          <td> {showingRoomsList ? showingRoomsList[runner] : "No Room"} </td>
          <td>{showingInstructorsList[runner]}</td>
          <td>{showingDWHList[0]}</td>
        </tr>
      );
    });
  }
  if (!props.isAuthenticatedAsProps) {
    return <Redirect to="/" />;
  }

  return (
    <div className="limiter">
      <div className="container-table100">
        <div className="wrap-table100">
          <div className="table100 ver1 m-b-110">
            <div className="table100-head">
              <table>
                <thead>
                  <tr className="row100 head">
                    <th className="cell100 column1">CourseName</th>
                    <th className="cell100 column2">CourseCHours</th>
                    <th className="cell100 column3">RoomNumber</th>
                    <th className="cell100 column4">Instructor</th>
                    <th className="cell100 column5">DWHours</th>
                  </tr>
                </thead>
              </table>
            </div>

            <div className="table100-body js-pscroll">
              <table>
                <tbody>{showingAllData}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticatedAsProps: state.userAuthReducer.isAuthenticated,
  coursesProps: state.recordsReducer.coursesList,
  roomsProps: state.recordsReducer.roomsList,
  dwHoursProps: state.recordsReducer.dWHoursList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCoursesActionAsProps: () => {
      dispatch(FetchAllCoursesAction());
    },
    fetchRoomsActionAsProps: () => {
      dispatch(FetchAllRoomsAction());
    },
    fetchDWHoursActionAsProps: () => {
      dispatch(FetchAllDWHoursAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowingAllRecords);
