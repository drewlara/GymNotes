import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './sidebar.css';

export function Siderbar(props) {
  let barClass = props.open ? 'side-bar side-bar open' : 'side-bar';
  let title = props.loggedIn ? `Hi, ${props.currentUser.firstName}` : 'Welcome to GymNotes';
  let navLinks = props.loggedIn ? (
    <ul className="user-links">
      <li><Link onClick={props.clickHandler} to={'/dashboard'}><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
      <li><Link onClick={props.clickHandler} to={'/workouts'}><i className="fas fa-dumbbell"></i> Workouts</Link></li>
      <li><Link onClick={props.clickHandler} to={'/tracker'}><i className="fas fa-chart-line"></i> Tracker</Link></li>
      <li><Link onClick={props.clickHandler} to={'/logout'}><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
    </ul>
  ) : (
    <ul className="no-user-links">
      <li><Link onClick={props.clickHandler} to={'/login'}>Login</Link></li>
      <li><Link onClick={props.clickHandler} to={'/register'}>Register</Link></li>
    </ul>
  );
  return (
    <div className={barClass}>
      <h1>{title}</h1>
        {navLinks}
    </div>
  )
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});


export default connect(mapStateToProps)(Siderbar);