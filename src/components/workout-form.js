import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, reset } from 'redux-form';
import { addWorkout } from '../actions/workouts';
import DatePicker from './date-picker';
import NameInput from './workout-name-input';
import TypeSelect from './workout-type-select';
import NumberInput from './workout-number-input';
import {required, nonEmpty, isTrimmed, nonZero, nonNegative, maxVal} from '../validators';
import uuid from 'uuid'
import requiresLogin from './requires-login';
import './workout-form.css'

class WorkoutForm extends React.Component {
  onSubmit(values){
    let id = uuid();
    values.id = id;
    this.props.dispatch(addWorkout(values));
    this.props.dispatch(reset('add-workout-form'));
    this.props.history.push('/workouts');
    console.log(values);
  }

  render() {
    let errorMessage;
      if (this.props.error) {
        errorMessage = (
          <div className="message message-error">{this.props.error} <i className="fas fa-exclamation-circle"></i></div>
        );
      }
    return (
      <div className="workout-form">
        <h1 className="workout-form-title">Add a workout</h1>
        {errorMessage}
        <form name="add-workout-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}>
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
        <button className="new-workout-button" type="submit" disabled={this.props.pristine || this.props.submitting}>Add Workout</button>
        </div>
        </form>
        <div className="back-link-wrapper">
          <Link className="back-link" to="/workouts">Back to workouts</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
});

WorkoutForm = connect(mapStateToProps)(WorkoutForm);

export default requiresLogin()(reduxForm({
  form: 'add-workout-form',
  initialValues: {
    reps: 1,
    weight: 5,
    date: Date.now(),
    comments: undefined
  }
})(WorkoutForm));