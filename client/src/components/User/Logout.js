import React, { Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import LogOutUserAction from "../../store/action/UserAuthActions/LogOutUserAction";

const logOutUser = (props) => {
  return (
    <Fragment>
      <NavLink onClick={props.logOutUserActionAsProps} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logOutUserActionAsProps: () => {
      dispatch(LogOutUserAction());
    },
  };
};

export default connect(null, mapDispatchToProps)(logOutUser);
