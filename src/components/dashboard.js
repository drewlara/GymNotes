import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteWorkout} from '../actions/workouts';
import BreakdownChart from './breakdown-chart';
import requiresLogin from './requires-login';
import moment from 'moment';
import './dashboard.css'

export class Dashboard extends React.Component {
  render() {
    let noWorkouts = <div className="no-workouts-wrapper"><Link className="no-workouts" to={'/workouts/add'}>Add a New Workout</Link></div>
    let display = this.props.workouts.length === 0 ? <div className="dash-display"><h2>No Workouts Found</h2>{noWorkouts}</div> : <div className="dash-display"><h2>Workout Breakdown</h2><BreakdownChart /></div>
    
    let currentWeek = this.props.workouts.filter(workout => {
      return workout.date >= moment().startOf('isoWeek').valueOf() && workout.date <= moment().endOf('isoWeek').valueOf()
    });

    let currentWorkouts = {};
    currentWeek.forEach(workout => {
      if(!currentWorkouts[moment(workout.date).format('MM-DD-YYYY')]){
        currentWorkouts[moment(workout.date).format('MM-DD-YYYY')] = [workout]
      }
      else {
        currentWorkouts[moment(workout.date).format('MM-DD-YYYY')].push(workout)
      }
    })
    let currentWorkoutDays = Object.keys(currentWorkouts).sort((a,b) => moment(a, 'MM-DD-YYYY HH:mm:ss A') - moment(b, 'MM-DD-YYYY HH:mm:ss A'));
    let currentWorkoutTitle = currentWorkoutDays.length > 0 ? <h2>Workouts logged this week</h2> : null;

    let dashCurrentDisplay;

    if(currentWeek.length > 0) {
      dashCurrentDisplay = currentWorkoutDays.map((day, index) => (
        <div className="dash-workout-list" key={index}>
          <h3>{moment(day, 'MM-DD-YYYY HH:mm:ss A').format('dddd')}</h3>
          <hr></hr>
          <ul key={index}>
            {
              currentWorkouts[day].map((workout, index) => (<li key={index}><Link className="workout-link" to={`/workouts/${workout.id}`}>{`${workout.name}`}</Link> {`${workout.weight}`} <span className="workout-sub">lbs</span> {`${workout.reps}`} <span className="workout-sub">reps</span> <span className="workout-list-options"><Link to={`/workouts/${workout.id}/edit`}><i className="far fa-edit"></i></Link> <span onClick={() => this.props.dispatch(deleteWorkout(workout))}><i className="far fa-trash-alt"></i></span></span> </li>))
            }
          </ul>
        </div>
      ))
    }
    else {
      dashCurrentDisplay = (
      <div className="dash-no-current">
        <h2>No workouts logged this week</h2>
        {noWorkouts}
      </div>
      )
    }

    return (
      <div className="dashboard">
        <h1>Dashboard</h1>
        {display}
        <div className="dash-current">
          {currentWorkoutTitle}
          {dashCurrentDisplay}
        </div>
      </div>
    )
  }
  
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
});

export default requiresLogin()(connect(mapStateToProps)(Dashboard));