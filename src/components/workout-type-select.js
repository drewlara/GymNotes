import React from 'react';
import { DropdownList } from 'react-widgets';
import 'react-widgets/dist/css/react-widgets.css'

export default function TypeSelect(props){
  let error;
    if (props.meta.touched && props.meta.error) {
        error = <div className="form-error">{props.meta.error} <i className="fas fa-exclamation-circle"></i></div>;
    }

    let warning;
    if (props.meta.touched && props.meta.warning) {
        warning = (
            <div className="form-warning">{props.meta.warning} <i className="fas fa-exclamation-circle"></i></div>
        );
    }
  return (
    <div className="workout-type-select">
    <DropdownList 
      data={['Arms', 'Shoulders', 'Back', 'Chest', 'Legs']}
      placeholder={'Select a workout type'}
      onChange={props.input.onChange}
      value={props.input.value}
    />
    {error}
    {warning}
    </div>
  )
}