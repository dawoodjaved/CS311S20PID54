import React, { Fragment, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Navbar, NavbarBrand, Nav, NavItem, Container } from "reactstrap";
import { connect } from "react-redux";

import LogOutUser from "../User/Logout";
import { Link } from "react-router-dom";

const AppNavbar = (props) => {
  const { isAuthenticated, user } = props.authAsProps;

  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/addrooms">
          Add Room
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/addcourses">
          Add Course
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/adddwhourse">
          Add DailyWorkingHours
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/allrecords">
          All Records
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/deleteallrecords">
          Delete Records
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/timetable">
          Generate TimeTable
        </Link>
      </li>

      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {props.authAsProps && user ? `Welcome ${user.name}` : ""}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <LogOutUser />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Sign In
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
    </Fragment>
  );

  return (
    <Navbar color="transparent" dark expand="sm" className="mb-5">
      <NavbarBrand href="/">TimeTable Generator</NavbarBrand>
      <Container>
        <Nav className="ml-auto" navbar>
          {isAuthenticated ? authLinks : guestLinks}
        </Nav>
      </Container>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return {
    authAsProps: state.userAuthReducer,
  };
};

export default connect(mapStateToProps)(AppNavbar);
