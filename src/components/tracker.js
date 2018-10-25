import React from 'react';
import { connect } from 'react-redux';
import TrackerChart from './tracker-chart';
import requiresLogin from './requires-login';
import './tracker.css';

export function Tracker(props){
  return (
    <div className="tracker">
      <h1>Tracker</h1>
      <TrackerChart />
    </div>
  )
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
});

export default requiresLogin()(connect(mapStateToProps)(Tracker));