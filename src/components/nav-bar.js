import React from 'react';
import { connect } from 'react-redux';
import SidebarToggle from './sidebar-toggle';
import './nav-bar.css';

export function NavBar(props){
  return (
    <nav className="nav-bar">
      <div className="nav-title">
        <h1>GymNotes</h1>
      </div>
      <div className="nav-links">
        <SidebarToggle toggle={props.sidebarHandler} />
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