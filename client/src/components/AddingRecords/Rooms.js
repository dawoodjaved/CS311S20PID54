import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import PostRoomsAction from "../../store/action/AddingRecordsAction/RoomsActions/AddingRoomsAction";
import clearErrorsAction from "../../store/action/ErrorActions/ClearErrorsAction";
import FetchAllRoomsAction from "../../store/action/AddingRecordsAction/RoomsActions/FetchAllRoomsAction";

const AddingRooms = (props) => {
  const [roomNo, setRoomNo] = useState("");

  const handleChangeRoom = (e) => setRoomNo(e.target.value);

  useEffect(() => {
    props.clrErrrorsActionAsProps();
    props.fetchRoomsActionAsProps();
  }, []);

  var checker = 0;
  var RoomsList;

  if (props.roomsProps) {
    RoomsList = props.roomsProps.map((vari) => {
      return String(vari.roomNo);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    for (var i = 0; i < RoomsList.length; i++) {
      if (roomNo === RoomsList[i]) {
        checker = 1;
      }
    }

    if (roomNo) {
      if (checker === 0) {
        //new user object.
        const newRoom = {
          roomNo,
        };

        // Add user via loginUserActionAsProps
        props.addRoomsActionAsProps(newRoom);
        setRoomNo("");

        toast.success("You Added A Room Successfully.");
      } else {
        checker = 0;
        toast.error("Sorry This Room is Already Present.");
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
            <span className="login100-form-title p-b-49">Adding Rooms</span>

            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Room No</span>
              <input
                className="input100"
                type="text"
                name="roomNo"
                value={roomNo}
                placeholder="Type Room Number"
                onChange={handleChangeRoom}
              />
              <span className="focus-input100" data-symbol="&#xf206;"></span>
            </div>

            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button className="login100-form-btn">Add Room</button>
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
  roomsProps: state.recordsReducer.roomsList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addRoomsActionAsProps: (data) => {
      dispatch(PostRoomsAction(data));
    },
    fetchRoomsActionAsProps: () => {
      dispatch(FetchAllRoomsAction());
    },
    clrErrrorsActionAsProps: () => {
      dispatch(clearErrorsAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddingRooms);
