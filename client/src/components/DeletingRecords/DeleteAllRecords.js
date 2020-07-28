import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DeleteCoursesAction from "../../store/action/AddingRecordsAction/CoursesActions/DeleteAllCoursesAction";
import DeleteDWHoursAction from "../../store/action/AddingRecordsAction/DWHoursAction/DeleteAllDWHoursAction";
import DeleteInstructorsAction from "../../store/action/AddingRecordsAction/TimeTableActions/DeleteAllTimeTablesAction";
import DeleteRoomsAction from "../../store/action/AddingRecordsAction/RoomsActions/DeleteAllRoomsAction";
import { connect } from "react-redux";
import "./style.css";
import { Redirect } from "react-router-dom";

const DeleteAllRecords = (props) => {
  const handleCoursesDelete = () => {
    props.deleteCoursesActionAsProps();
    toast.success("You Deleted A Course Successfully");
  };
  const handleInstructorsDelete = () => {
    props.deleteInstructorsActionAsProps();
    toast.success("You Deleted An Instructor Successfully");
  };
  const handleDWHoursDelete = () => {
    props.deleteDWHoursActionAsProps();
    toast.success("You Deleted A DailyWorkingHour Successfully");
  };
  const handleRoomsDelete = () => {
    props.deleteRoomsActionAsProps();
    toast.success("You Deleted A Room Successfully");
  };
  if (!props.isAuthenticatedAsProps) {
    return <Redirect to="/" />;
  }
  return (
    <div className="button_container">
      <ToastContainer />
      <button className="btn" onClick={handleCoursesDelete}>
        <span>Delete Course</span>
      </button>
      <br />
      <button className="btn" onClick={handleRoomsDelete}>
        <span>Delete Room</span>
      </button>
      <br />
      <button className="btn" onClick={handleDWHoursDelete}>
        <span>Delete DailyWorkingHour</span>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticatedAsProps: state.userAuthReducer.isAuthenticated,
  errorAsProps: state.errorReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCoursesActionAsProps: () => {
      dispatch(DeleteCoursesAction());
    },
    deleteInstructorsActionAsProps: () => {
      dispatch(DeleteInstructorsAction());
    },
    deleteDWHoursActionAsProps: () => {
      dispatch(DeleteDWHoursAction());
    },
    deleteRoomsActionAsProps: () => {
      dispatch(DeleteRoomsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAllRecords);
