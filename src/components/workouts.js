import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { workoutDelete } from '../actions/workouts';
import requiresLogin from './requires-login';
import './workouts.css'
import moment from 'moment';

export function Workouts(props){ 
  let workouts = {};
  props.workouts.forEach(workout => {
    if(!workouts[moment(workout.date).format('MM-DD-YYYY')]){
      workouts[moment(workout.date).format('MM-DD-YYYY')] = [workout]
    }
    else {
      workouts[moment(workout.date).format('MM-DD-YYYY')].push(workout)
    }
  })
  let workoutDates = Object.keys(workouts).sort((a,b) => moment(b, 'MM-DD-YYYY HH:mm:ss A') - moment(a, 'MM-DD-YYYY HH:mm:ss A'));
  
  const workoutsOutput = workoutDates.map((date,index) => (
    <div className="workout-list" key={index}>
      <h2>{moment(date, 'MM-DD-YYYY HH:mm:ss A').format('dddd, MMMM Do YYYY')}</h2>
      <hr></hr>
      <ul key={date}>
        {
          workouts[date].map((workout, index) => (<li key={index}><Link className="workout-view" to={`/workouts/${workout.id}`}>{`${workout.name}`}</Link> {`${workout.weight}`} <span className="workout-sub">lbs</span> {`${workout.reps}`} <span className="workout-sub">reps</span> <span className="workout-list-options"><Link to={`/workouts/${workout.id}/edit`}><i className="far fa-edit"></i></Link> <span onClick={() => props.dispatch(workoutDelete(workout))}><i className="far fa-trash-alt"></i></span></span> </li>))
        }
      </ul>
    </div>
  ));

  return (
    <div className="workouts">
      <h1 className="workouts-title">Workouts</h1>
      <div className="add-workout-wrapper">
        <Link to={"/workouts/add"} className="add-workout">Add New Workout</Link>
      </div>
      {workoutsOutput}
    </div>
  )
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
});

export default requiresLogin()(connect(mapStateToProps)(Workouts));