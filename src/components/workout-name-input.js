import React from 'react';
import { Combobox } from 'react-widgets';
import { connect } from 'react-redux';
import 'react-widgets/dist/css/react-widgets.css'

export class NameInput extends React.Component {

  render() {
    let workoutNames = [];
    this.props.workouts.forEach(workout => workoutNames.push(workout.name));
    workoutNames = [...new Set(workoutNames)];

    let error;
      if (this.props.meta.touched && this.props.meta.error) {
          error = <div className="form-error">{this.props.meta.error} <i className="fas fa-exclamation-circle"></i></div>;
      }

      let warning;
      if (this.props.meta.touched && this.props.meta.warning) {
          warning = (
              <div className="form-warning">{this.props.meta.warning} <i className="fas fa-exclamation-circle"></i></div>
          );
      }

    return (
      <div className="workout-name-input">
        <Combobox 
          onChange={this.props.input.onChange}
          value={this.props.input.value}
          data={workoutNames}
          suggest={true}
          placeholder={'Enter or select an existing workout'}
          messages={{emptyList: 'No logged workouts'}}
        />
        {error}
        {warning}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
})

export default connect(mapStateToProps)(NameInput)
