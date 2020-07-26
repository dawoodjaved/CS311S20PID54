import React, { useState, useEffect } from "react";

import FetchAllCoursesAction from "../../store/action/AddingRecordsAction/CoursesActions/FetchAllCoursesAction";
import FetchAllRoomsAction from "../../store/action/AddingRecordsAction/RoomsActions/FetchAllRoomsAction";
import FetchAllDWHoursAction from "../../store/action/AddingRecordsAction/DWHoursAction/FetchAllDWHoursAction";

import { connect } from "react-redux";
import TimeTable from "./TimeTable";

const ActivitySchedulingAlgorithm = (props) => {
  const [finalCourses, setFinalCourses] = useState("");
  const [finalRooms, setFinalRooms] = useState("");
  const [finalInstructors, setFinalInstructors] = useState("");
  const [finalTimeSlots, setFinalTimeSlots] = useState("");
  const [finalDays, setFinalDays] = useState("");

  useEffect(() => {
    props.fetchCoursesActionAsProps();
    props.fetchRoomsActionAsProps();
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

  var creditHoursList;
  var DailyWorkingHours;
  var courseNameList;
  var courseInstructorList;
  var RoomsList;

  var totalCreditHours;

  var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  //credit Hours:
  if (props.coursesProps) {
    creditHoursList = props.coursesProps.map((variableWithIndex) => {
      return variableWithIndex.creditHours;
    });
    totalCreditHours = sum(creditHoursList);
  }

  var value;
  var numChecker;

  //Daily Working Hours:
  if (props.dwHoursProps) {
    DailyWorkingHours = props.dwHoursProps.map((variableWithIndex) => {
      return variableWithIndex.dailyWorkingHours;
    });
    value = Object.values(DailyWorkingHours);
    numChecker = parseInt(value);
  }
  var timeslots = [];

  if (numChecker === 1) {
    timeslots = ["08:00-09:00"];
  } else if (numChecker === 2) {
    timeslots = ["08:00-09:00", "09:00-10:00"];
  } else if (numChecker === 3) {
    timeslots = ["08:00-09:00", "09:00-10:00", "10:00-11:00"];
  } else if (numChecker === 4) {
    timeslots = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00"];
  } else if (numChecker === 5) {
    console.log("hello how are you");
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
    ];
  } else if (numChecker === 6) {
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
      "02:00-03:00",
    ];
  } else if (numChecker === 7) {
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
      "02:00-03:00",
      "03:00-04:00",
    ];
  } else if (numChecker === 8) {
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
      "02:00-03:00",
      "03:00-04:00",
      "04:00-05:00",
    ];
  } else if (numChecker === 9) {
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
      "02:00-03:00",
      "03:00-04:00",
      "04:00-05:00",
      "05:00-06:00",
    ];
  } else if (numChecker === 10) {
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
      "02:00-03:00",
      "03:00-04:00",
      "04:00-05:00",
      "05:00-06:00",
      "06:00-07:00",
    ];
  } else if (numChecker === 11) {
    timeslots = [
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "11:00-12:00",
      "01:00-02:00",
      "02:00-03:00",
      "03:00-04:00",
      "04:00-05:00",
      "05:00-06:00",
      "06:00-07:00",
      "07:00-08:00",
    ];
  }
  var totalDailyWorkingHours;
  if (DailyWorkingHours) {
    totalDailyWorkingHours = sum(DailyWorkingHours) * 5;
    console.log(totalDailyWorkingHours);
  }

  //courses Name
  if (props.coursesProps) {
    courseNameList = props.coursesProps.map((varia) => {
      return String(varia.courseName);
    });
  }
  console.log(courseNameList);

  //courses Instructors
  if (props.coursesProps) {
    courseInstructorList = props.coursesProps.map((variable) => {
      return String(variable.instructorName);
    });
  }
  console.log(typeof courseInstructorList[0]);
  //Rooms
  if (props.roomsProps) {
    RoomsList = props.roomsProps.map((vari) => {
      return vari.roomNo;
    });
  }

  var timeTable = [];
  var confilictsFreeTimeTable = [];

  var checker = 0;
  var coursesProps = [];
  var instructorsProps = [];
  var roomsProps = [];
  var timeslotsProps = [];
  var daysProps = [];
  var running = 1;
  var filter = 0;

  const courseCreditHoursDecremental = (courseName, courseNamesList) => {
    console.log(courseName);
    console.log("creditHours:,", creditHoursList);
    for (var m = 0; m < courseNamesList.length; m++) {
      if (courseNamesList[m].localeCompare(courseName) === 0) {
        console.log(creditHoursList[m]);

        if (parseInt(creditHoursList[m]) !== 0) {
          creditHoursList[m] = creditHoursList[m] - 1;

          break;
        }
      }
    }
  };

  const initilize = (roomslist, cNames, cInstructors) => {
    filter = 0;
    console.log(running);
    if (totalCreditHours <= totalDailyWorkingHours) {
      timeTable = [];
      var index = 0;
      console.log("roomsList,", roomslist.length);
      for (var i = 0; i < creditHoursList.length; i++) {
        for (var j = 0; j < creditHoursList[i]; j++) {
          var randomRoomNo =
            roomslist[Math.floor(Math.random() * roomslist.length)];
          var randomTimeSlot =
            timeslots[Math.floor(Math.random() * timeslots.length)];
          var randomDay = days[Math.floor(Math.random() * days.length)];

          var myclass = {
            courseName: String(cNames[index]),
            instructorName: String(cInstructors[index]),
            roomNo: String(randomRoomNo),
            timeslot: String(randomTimeSlot),
            day: String(randomDay),
          };
          console.log(typeof String(cNames[index]));
          timeTable.push(myclass);
        }

        index++;
      }
      if (checker === 0) {
        var timeTableValues = Object.values(timeTable[0]);
        console.log("timetable,", timeTable[0]);
        confilictsFreeTimeTable.push(timeTable[0]);
        console.log("conflictsremovabletimetable: ", confilictsFreeTimeTable);

        courseCreditHoursDecremental(timeTableValues[0], cNames);

        checker++;
        initilize(roomslist, cNames, cInstructors);
      } else {
        if (confilictsFreeTimeTable.length !== totalCreditHours) {
          console.log("conflictsfreetimetable: ", confilictsFreeTimeTable);
          for (var k = 0; k < timeTable.length; k++) {
            var timeTableValuess = Object.values(timeTable[k]);
            for (var g = 0; g < confilictsFreeTimeTable.length; g++) {
              var conflictsFreeTTValues = Object.values(
                confilictsFreeTimeTable[g]
              );
              if (
                conflictsFreeTTValues[3].localeCompare(timeTableValuess[3]) ===
                  0 &&
                conflictsFreeTTValues[4].localeCompare(timeTableValuess[4]) ===
                  0
              ) {
                if (
                  conflictsFreeTTValues[2].localeCompare(
                    timeTableValuess[2]
                  ) !== 0
                ) {
                  filter++;
                }
              } else {
                filter++;
              }
            }
            if (filter === confilictsFreeTimeTable.length) {
              confilictsFreeTimeTable.push(timeTable[k]);
              courseCreditHoursDecremental(timeTableValuess[0], cNames);
            }
            filter = 0;
          }
          initilize(roomslist, cNames, cInstructors);
        }
        console.log(confilictsFreeTimeTable.length);
        for (var k = 0; k < confilictsFreeTimeTable.length; k++) {
          const values = Object.values(confilictsFreeTimeTable[k]);
          coursesProps = [...coursesProps, values[0]];
          instructorsProps = [...instructorsProps, values[1]];
          roomsProps = [...roomsProps, values[2]];
          timeslotsProps = [...timeslotsProps, values[3]];
          daysProps = [...daysProps, values[4]];
        }
      }
    }
    running++;
    return confilictsFreeTimeTable;
  };

  var allCourses = [];
  var allInstructors = [];
  var allRooms = [];
  var allTimeSlots = [];
  var allDays = [];

  const handleTable = (e) => {
    if (RoomsList && courseNameList && courseInstructorList) {
      initilize(RoomsList, courseNameList, courseInstructorList);
      console.log(daysProps[2]);
      for (var y = 0; y < totalCreditHours; y++) {
        allCourses.push(coursesProps[y]);
        allInstructors.push(instructorsProps[y]);
        allRooms.push(roomsProps[y]);
        allTimeSlots.push(timeslotsProps[y]);
        allDays.push(daysProps[y]);
      }
      setFinalCourses(allCourses);
      setFinalInstructors(allInstructors);
      setFinalRooms(allRooms);
      setFinalTimeSlots(allTimeSlots);
      setFinalDays(allDays);
    } else {
      console.log("sorry");
    }
  };
  return (
    <div>
      <TimeTable
        algo={handleTable}
        courses={finalCourses}
        instructors={finalInstructors}
        rooms={finalRooms}
        timeSlots={finalTimeSlots}
        days={finalDays}
      />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivitySchedulingAlgorithm);
