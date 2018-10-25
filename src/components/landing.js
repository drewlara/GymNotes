import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
      <div className="home">
        <div className="home-inner">
          <h1>GymNotes</h1>
          <h2>A simple way to keep track of your workouts</h2>
          <div className="get-started-wrapper">
            <Link to="/register"><strong>Get Started</strong></Link>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);