import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "./css/main.css";
import "./css/util.css";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./timeTableStyle.css";

const TimeTable = ({
  courses,
  instructors,
  rooms,
  timeSlots,
  days,
  algo,
  isAuthenticatedAsProps,
}) => {
  console.log(days);
  var runner = -1;
  var showingTimeTable;
  if (courses) {
    showingTimeTable = courses.map((course) => {
      runner++;
      return (
        <tr className="row100 body">
          <td>{days[runner]}</td>
          <td>{timeSlots[runner]}</td>
          <td>{rooms[runner]}</td>
          <td>{course}</td>
          <td>{instructors[runner]}</td>
        </tr>
      );
    });
  }
  if (!isAuthenticatedAsProps) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="button_cont">
        <button className="newButton" onClick={algo}>
          <span>Generate TimeTable</span>
        </button>
      </div>
      <div className="limiter">
        <div className="container-table100">
          <div className="wrap-table100">
            <div className="table100 ver1 m-b-110">
              <div className="table100-head">
                <table>
                  <thead>
                    <tr className="row100 head">
                      <th className="cell100 column1">Day</th>
                      <th className="cell100 column2">TimeSlot</th>
                      <th className="cell100 column3">Room</th>
                      <th className="cell100 column4">CourseName</th>
                      <th className="cell100 column5">Instructor</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="table100-body js-pscroll">
                <table>
                  <tbody>{showingTimeTable}</tbody>
                </table>
              </div>
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

export default connect(mapStateToProps)(TimeTable);
