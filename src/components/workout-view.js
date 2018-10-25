import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import requiresLogin from './requires-login';
import './workout-view.css';

export function WorkoutView(props){
  const displayedWorkout = props.workouts.find(workout => workout.id === props.match.params.id)
  return (
    <div className="workout-view-page">
      <h1>{displayedWorkout.name}</h1>
      <p>Type: {displayedWorkout.type}</p>
      <div className="workout-stats">
        <p>{displayedWorkout.weight} lbs</p>
        <p>{displayedWorkout.reps} reps</p>
        <p>{moment(displayedWorkout.date).format('dddd, MMMM Do YYYY')}</p>
      </div>
      <div className="workout-comments">
        <p>{displayedWorkout.comments === undefined ? null : displayedWorkout.comments}</p>
      </div>
      <span onClick={() => props.history.goBack()}>Go Back</span>
    </div>
  )
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
})

export default requiresLogin()(connect(mapStateToProps)(WorkoutView));