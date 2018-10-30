import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SidebarToggle from './sidebar-toggle';
import './nav-bar.css';

export function NavBar(props){
  let navLinksResp = props.loggedIn ? (
    <ul className="user-links">
      <li><Link to={'/dashboard'}><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
      <li><Link to={'/workouts'}><i className="fas fa-dumbbell"></i> Workouts</Link></li>
      <li><Link to={'/tracker'}><i className="fas fa-chart-line"></i> Tracker</Link></li>
      <li><Link to={'/logout'}><i className="fas fa-sign-out-alt"></i> Logout</Link></li>
    </ul>
  ) : (
    <ul className="no-user-links">
      <li><Link to={'/login'}>Login</Link></li>
      <li><Link to={'/register'}>Register</Link></li>
    </ul>
  );

  return (
    <nav className="nav-bar">
      <div className="nav-title">
        <h1>GymNotes</h1>
      </div>
      <div className="nav-links">
        <SidebarToggle toggle={props.sidebarHandler} />
      </div>
      <div className="nav-links-resp">
        {navLinksResp}
      </div>
    </nav>
  )
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null,
  currentUser: state.auth.currentUser
});


export default connect(mapStateToProps)(NavBar);