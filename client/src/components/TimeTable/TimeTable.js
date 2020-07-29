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
  allDays,
  isAuthenticatedAsProps,
}) => {
  console.log(days);
  var runner = -1;
  var sortedCourses = [];
  var sortedRoomNumbers = [];
  var sortedDays = [];
  var sortedTimeSlots = [];
  var sortedInstructors = [];

  for (var i = 0; i < allDays.length; i++) {
    for (var j = 0; j < days.length; j++) {
      if (allDays[i] === days[j]) {
        sortedCourses.push(courses[j]);
        sortedRoomNumbers.push(rooms[j]);
        sortedDays.push(days[j]);
        sortedInstructors.push(instructors[j]);
        sortedTimeSlots.push(timeSlots[j]);
      }
    }
  }

  var showingTimeTable;
  if (courses) {
    showingTimeTable = sortedCourses.map((course) => {
      runner++;
      return (
        <tr className="row106 body">
          <td>{sortedDays[runner]}</td>
          <td>{sortedTimeSlots[runner]}</td>
          <td>{sortedRoomNumbers[runner]}</td>
          <td>{course}</td>
          <td>{sortedInstructors[runner]}</td>
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
        <div className="container-table106">
          <div className="wrap-table106">
            <div className="table106 ver1 m-b-110">
              <div className="table106-head">
                <table>
                  <thead>
                    <tr className="row106 head">
                      <th className="cell106 column1">Day</th>
                      <th className="cell106 column2">TimeSlot</th>
                      <th className="cell106 column3">Room</th>
                      <th className="cell106 column4">CourseName</th>
                      <th className="cell106 column5">Instructor</th>
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
