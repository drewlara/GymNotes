import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { workoutPut } from '../actions/workouts'
import NumberInput from './workout-number-input';
import NameInput from './workout-name-input';
import TypeSelect from './workout-type-select';
import DatePicker from './date-picker';
import requiresLogin from './requires-login';
import {required, nonEmpty, isTrimmed, nonZero, nonNegative, maxVal} from '../validators';

export class WorkoutEditForm extends React.Component {
  onSubmit(values){
    values.id = this.props.match.params.id;
    //this.props.dispatch(editWorkout(values))
    this.props.dispatch(workoutPut(values));
    this.props.dispatch(reset('edit-workout-form'));
    this.props.history.goBack();
  }

  render() {

    let errorMessage;
      if (this.props.error) {
        errorMessage = (
          <div className="message message-error">{this.props.error}</div>
        );
      }
    return ( 
      <div className="workout-form-wrapper">
      <div className="workout-form">
        <h1 className="workout-form-title">Edit workout</h1>
        {errorMessage}
        <form name="edit-workout-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
        <div className="form-group">
          <label htmlFor="name">Workout Name</label>
          <Field name="name" id="name" type="text" component={NameInput} validate={[required, nonEmpty, isTrimmed]} />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <Field className="type" name="type" id="type" component={TypeSelect} validate={[required]} />
        </div>
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <Field name="weight" id="weight" type="number" component={NumberInput} min={1} max={999} increment={5} validate={[required, nonZero, nonNegative, maxVal]} />
        </div>
        <div className="form-group">
          <label htmlFor="reps">Reps</label>
          <Field name="reps" id="reps" type="number" component={NumberInput} min={1} max={999} increment={1} validate={[required, nonZero, nonNegative, maxVal]} />
        </div>
        <div className="form-group">
          <label>Date</label>
          <Field name="date" component={DatePicker} validate={[required]} />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <Field className="comments" name="comments" id="comments" component="textarea" />
        </div>
        <div className="form-group">
        <button className="new-workout-button" type="submit" disabled={this.props.pristine || this.props.submitting}>Edit Workout</button>
        </div>
        </form>
        <div className="back-link-wrapper">
          <span onClick={() => this.props.history.goBack()}>Go Back</span>
        </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  const workout = state.app.workouts.find(workout => workout.id === props.match.params.id);
  return {
    initialValues: {
      reps: workout.reps,
      weight: workout.weight,
      date: workout.date,
      name: workout.name,
      type: workout.type
    }
  }
}

export default requiresLogin()(connect(mapStateToProps)(
  reduxForm({
    form: 'edit-workout-form',
  })(WorkoutEditForm)
));