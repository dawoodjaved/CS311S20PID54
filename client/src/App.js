import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Rooms from "./components/AddingRecords/Rooms";
import Courses from "./components/AddingRecords/Courses";
import DailyWorkingHours from "./components/AddingRecords/DailyWorkingHours";
import DeleteAllRecords from "./components/DeletingRecords/DeleteAllRecords";

import ShowingAllRecords from "./components/ShowingAllRecords/ShowingAllRecords";
import ActivitySchedulingAlgorithm from "./components/TimeTable/ActivitySchedulingAlgorithm";

class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/addrooms" component={Rooms} />
          <Route path="/addcourses" component={Courses} />
          <Route path="/adddwhourse" component={DailyWorkingHours} />
          <Route path="/deleteallrecords" component={DeleteAllRecords} />
          <Route path="/timetable" component={ActivitySchedulingAlgorithm} />
          <Route path="/allrecords" component={ShowingAllRecords} />
        </Switch>
      </Router>
    );
  }
}

export default App;
